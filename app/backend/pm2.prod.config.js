const instances = process.env.ASM_APP_INSTANCE
  ? parseInt(process.env.ASM_APP_INSTANCE, 10)
  : 2;

module.exports = {
  apps: [
    {
      name: 'http',
      script: './app-http.js',
      instances,
    },
    {
      name: 'worker',
      script: './app-worker.js',
      instances: 1,
    },
  ],
};
