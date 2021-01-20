const { envSchema } = require('env-schema');

class Config {
  /**
   * Create config base on json schema on process.env
   *
   * @param {Object} schema
   * @param {Object} envObject
   */
  constructor(schema, envObject) {
    /** @private */
    this.schema = schema;
    /** @private */
    this.config = {};
    /** @private */
    this.public = {};

    this.process(envObject);
  }

  /**
   * Process the environment variable
   *
   * @param {Object} envObject
   * @private
   * @return {Config}
   */
  process(envObject) {
    /** @type {any} */
    const ConfigObject = {};
    Object.keys(envObject).forEach((name) => {
      if (name.match(/^ASM_/)) {
        ConfigObject[`${name}`] = envObject[`${name}`];
      }
    });

    this.config = envSchema({
      schema: this.schema,
      data: ConfigObject,
    });

    Object.keys(this.config).forEach((name) => {
      if (name.match(/^ASM_PUBLIC_/)) {
        this.public[`${name}`] = this.config[`${name}`];
      }
    });

    return this;
  }

  /**
   * Get all configurations
   *
   * @return {Object}
   */
  getAll() {
    return this.config;
  }

  /**
   * Get public configuration
   *
   * @return {Object}
   */
  getPublic() {
    return this.public;
  }
}

module.exports = {
  Config,
};
