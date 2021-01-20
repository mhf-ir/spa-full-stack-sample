// @ts-check

const { Organization } = require('@aasaam/information');
const { fastify } = require('fastify');
const { fastifyHelmet } = require('fastify-helmet');
const fastifyOpenAPI = require('fastify-oas');
const fastifyRateLimit = require('fastify-rate-limit');

const GenericResponse = require('./GenericResponse.js');

const description = `
### Disclaimer
By using this api, assume you're know what's doing.

#### Need support

Ask the for help from **${Organization.en.description}** support center.

* ${Organization.en.telephone.join(', ')}
* ${Organization.en.address.addressLocality}, ${
  Organization.en.address.addressRegion
}, ${Organization.en.address.addressCountry}
`;

class Fastify {
  constructor({ Config }) {
    this.Config = Config;

    this.fastify = fastify({
      trustProxy: true,
      requestIdHeader: 'x-request-id',
      requestIdLogLabel: 'rid',
      logger: {
        level: Config.ASM_PUBLIC_APP_TEST ? 'trace' : 'warn',
      },
    });

    this.fastify.addHook('onRequest', async (_, reply) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      reply.setPublicCache = (ttl = 86400) => {
        const date = new Date();
        const expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + ttl);
        reply.header(
          'Cache-Control',
          `max-age=${ttl}, public, post-check=0, pre-check=0`,
        );
        reply.header('Pragma', 'public');
        reply.header('Last-Modified', date.toUTCString());
        reply.header('Expires', expireDate.toUTCString());
        reply.header('X-Accel-Expires', expireDate.toUTCString());
      };
    });

    this.setErrorHandler();
    // this.setUserAuthPreHandler();
    this.setOpenApi();

    // this.fastify.register(fastifyHelmet, (instance) => {
    //   return {
    //     contentSecurityPolicy: {
    //       directives: {
    //         defaultSrc: ["'self'"],
    //         imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
    //         scriptSrc: ["'self'"].concat(instance.swaggerCSP.script),
    //         styleSrc: ["'self'", 'https:'].concat(instance.swaggerCSP.style),
    //       },
    //     },
    //   };
    // });
  }

  setRateLimit() {
    // @ts-ignore
    this.fastify.register(fastifyRateLimit, {
      global: false,
      max: 10,
      ban: 2,
      timeWindow: 5000,
      cache: 10000,
      allowList: [],
      // redis: new Redis({ host: '127.0.0.1' }), // default null
      skipOnError: false, // default false
      keyGenerator: (req) => {
        return req.headers['x-forwarded-for'] || req.raw.ip;
      },
      errorResponseBuilder: (req, context) => {
        const error429 = new GenericResponse(429);
        return error429.getObject();
      },
      addHeaders: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
        'retry-after': true,
      },
    });
  }

  getFastify() {
    return this.fastify;
  }

  setOpenApi() {
    const defaultSchemaError = new GenericResponse(500);
    this.fastify.addSchema(defaultSchemaError.getSchema());

    /** @type {import('fastify-oas').OpenApiSpec} */
    const swagger = {
      openapi: '3.0.3',
      info: {
        title: this.Config.ASM_PUBLIC_APP_TITLE,
        version: '1.0.0',
        description,
        contact: {
          name: Organization.en.name,
          url: Organization.en.url,
          email: Organization.en.email,
        },
        license: {
          name: 'CC-BY-3.0',
          url: 'https://creativecommons.org/licenses/by/3.0/',
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            description:
              'Access for none browser client like mobile applications',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          cookieToken: {
            description: 'Default access for web application',
            type: 'apiKey',
            in: 'cookie',
            name: this.Config.ASM_AUTH_COOKIE,
          },
          userApiKey: {
            description: 'User access via API Key',
            type: 'apiKey',
            in: 'header',
            name: this.Config.ASM_AUTH_USER_API_KEY,
          },
        },
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      servers: [
        // @ts-ignore
        {
          description: this.Config.ASM_PUBLIC_APP_TITLE,
          url: `/`,
        },
      ],
    };

    const openApiConfig = {
      routePrefix: `${this.Config.ASM_PUBLIC_BACKEND_PREFIX}/docs`,
      exposeRoute: true,
      addModels: true,
      swagger,
    };

    this.fastify.register(fastifyOpenAPI, openApiConfig);
  }

  setErrorHandler() {
    this.fastify.setErrorHandler(function setErrorHandler(e, request, reply) {
      let schemaError = new GenericResponse(500);

      let error = schemaError.getObject();
      if ('validation' in e) {
        schemaError = new GenericResponse(422);
        error = schemaError.getObject();
        error.message = e.message;

        // @ts-ignore
        error.validations = e.validation.map(
          (v) => `${v.dataPath}: ${v.message}`,
        );
      }

      if (process.env.NODE_ENV === 'test') {
        error.name = e.name;
        error.stack = e.stack
          .split('\n')
          .map((l) => l.trim())
          .join('\n');
      }

      return reply.code(error.statusCode).send(error);
    });

    this.fastify.setNotFoundHandler((_, reply) => {
      const e = new GenericResponse(404);
      e.reply(reply);
    });
  }

  // setUserAuthPreHandler() {
  //   this.fastify.addHook('onRequest', async (req) => {
  //     let token = false;
  //     const u = await this.Token.verifyFromRequest(req.raw);
  //     if (u) {
  //       token = u;
  //     }
  //     // @ts-ignore
  //     req.raw.token = token;
  //   });

  //   this.fastify.decorate('userAuthPreHandler', (req, reply, next) => {
  //     if (req.raw.token) {
  //       next();
  //     } else {
  //       const schemaError = new GenericResponse(403);
  //       schemaError.reply(reply);
  //     }
  //   });
  // }
}

module.exports = Fastify;
