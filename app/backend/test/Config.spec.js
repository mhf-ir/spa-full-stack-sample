/* eslint-env jest */

const { Config } = require('../lib/Config');

describe(__filename.replace(__dirname, ''), () => {
  it('Config', async () => {
    const envObject = {
      ASM_PUBLIC_PORT: '1000',
      ASM_PORT: '1001',
      NOT_CONVENTION: 1,
    };

    const schema = {
      type: 'object',
      required: ['ASM_PUBLIC_PORT', 'ASM_PORT'],
      properties: {
        ASM_PUBLIC_PORT: {
          type: 'number',
          default: 3000,
        },
        ASM_PORT: {
          type: 'number',
          default: 3000,
        },
      },
    };

    const cnf = new Config(schema, envObject);
    const allCnf = cnf.getAll();
    const publicCnf = cnf.getPublic();

    expect(allCnf.ASM_PUBLIC_PORT).toBe(1000);
    expect(allCnf.ASM_PUBLIC_PORT).toBe(publicCnf.ASM_PUBLIC_PORT);
    expect(allCnf.ASM_PORT).toBe(1001);
    expect(publicCnf.ASM_PORT).toBe(undefined);
    expect(publicCnf.NOT_CONVENTION).toBe(undefined);
  });
});
