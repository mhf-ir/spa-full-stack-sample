const ioredis = require('ioredis');

class Redis {
  constructor({ Config }) {
    this.ASM_REDIS_URI = Config.ASM_REDIS_URI;
    this.ASM_PUBLIC_APP_NS = Config.ASM_PUBLIC_APP_NS;
    /** @type {import('ioredis').Redis} */
    this.connection = undefined;
  }

  async getRedis() {
    if (this.connection === undefined) {
      this.connection = new ioredis(this.ASM_REDIS_URI, {
        prefix: `nodejs:${this.ASM_PUBLIC_APP_NS}`,
      });
      await this.connection.connect();
    }
    return this.connection;
  }

  async quit() {
    if (this.connection) {
      await this.connection.quit();
      this.connection = undefined;
    }
  }
}

module.exports = Redis;
