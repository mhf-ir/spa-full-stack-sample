const { Config } = require('./lib/Config');
const { Container } = require('./lib/Container');
const ConfigSchema = require('./src/ConfigSchema');
const Fastify = require('./lib/Fastify');

(async () => {
  const config = new Config(ConfigSchema, process.env);
  const container = await Container(config);
  const configData = container.resolve('Config');
  const f = new Fastify({ Config: configData });
  const fst = f.getFastify();

  fst.route({
    url: `${configData.ASM_PUBLIC_BACKEND_PREFIX}/test`,
    method: 'GET',
    schema: {},
    handler: async (req, reply) => {
      reply.send(JSON.parse(JSON.stringify(req.headers)));
    },
  });

  fst.route({
    url: `${configData.ASM_PUBLIC_BACKEND_PREFIX}/test2`,
    method: 'GET',
    schema: {
      security: [
        {
          Bearer: [],
          AuthCookie: [],
        },
      ],
    },
    handler: async (req, reply) => {
      reply.setPublicCache(60);
      reply.send(JSON.parse(JSON.stringify(req.headers)));
    },
  });

  console.log(config.getAll().ASM_APP_PORT);
  fst.listen(config.getAll().ASM_APP_PORT, '0.0.0.0', (e) => {
    console.log(e);
  });
})();
