module.exports = {
    apps: [
      {
        name: 'donations-api',
        script: './dist/app.js',
        watch: true,
        ignore_watch: ["node_modules", "dist"],
        watch_options: {
          "followSymlinks": false
        },
        env: {
          NODE_ENV: 'development',
          PORT: 4321
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 4321
        }
      }
    ]
  };
  