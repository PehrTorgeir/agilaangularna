module.exports = {
    apps : [{
      name: 'agilaangularna-1',
      script: '/home/jelastic/ROOT/node_modules/@angular/cli/bin/ng.js',
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
  