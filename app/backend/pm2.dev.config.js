module.exports = {
  apps: [
    {
      name: 'http',
      script: './app-http.js',
      watch: ['src', 'lib'],
      watch_delay: 1000,
      ignore_watch: ['node_modules'],
      instances: 2,
    },
    {
      name: 'worker',
      script: './app-worker.js',
      watch: ['src', 'lib'],
      watch_delay: 1000,
      ignore_watch: ['node_modules'],
      instances: 1,
    },
  ],
};
