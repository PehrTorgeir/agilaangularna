module.exports = {
    apps : [{
      name: 'angular-app',
      script: 'node_modules/@angular/cli/bin/ng',
      args: 'serve --host 0.0.0.0 --port 4200',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }]
  };
  