/** @type {import('json-schema').JSONSchema7} */
const ConfigSchema = {
  type: 'object',
  required: [
    'ASM_PUBLIC_APP_NS',
    'ASM_PUBLIC_BACKEND_PREFIX',
    'ASM_PUBLIC_APP_TITLE',
    'ASM_PUBLIC_APP_TEST',
    'ASM_PUBLIC_APP_READ_ONLY',
    'ASM_AUTH_COOKIE',
    'ASM_AUTH_USER_API_KEY',
    'ASM_APP_PORT',
    'ASM_APP_INSTANCE',
    'ASM_REDIS_URI',
  ],
  properties: {
    ASM_PUBLIC_APP_NS: {
      type: 'string',
      default: 'app-test',
    },
    ASM_PUBLIC_BACKEND_PREFIX: {
      type: 'string',
      default: '/api',
    },
    ASM_AUTH_COOKIE: {
      type: 'string',
      default: '__auth',
    },
    ASM_AUTH_USER_API_KEY: {
      type: 'string',
      default: 'x-user-api-key',
    },
    ASM_PUBLIC_APP_TITLE: {
      type: 'string',
      default: 'Test Application',
    },
    ASM_PUBLIC_APP_TEST: {
      type: 'boolean',
      default: false,
    },
    ASM_PUBLIC_APP_READ_ONLY: {
      type: 'boolean',
      default: false,
    },
    ASM_APP_PORT: {
      type: 'number',
      default: 3001,
      minimum: 1024,
      maximum: 49151,
    },
    ASM_APP_INSTANCE: {
      type: 'number',
      default: 2,
      minimum: 1,
      maximum: 16,
    },

    ASM_REDIS_URI: {
      type: 'string',
      format: 'uri',
      default: 'redis://app-redis',
    },
  },
};

module.exports = ConfigSchema;
