const { createContainer, asValue } = require('awilix');

const Container = async (Config) => {
  const container = createContainer();

  container.register({
    Config: asValue(Config.getAll()),
    PublicConfig: asValue(Config.getPublic()),
  });

  return container;
};

module.exports = {
  Container,
};
