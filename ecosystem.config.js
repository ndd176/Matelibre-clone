module.exports = {
  apps: [
    {
      name: 'matelibre-clone',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/matelibre-clone/matelibre-clone',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/matelibre-clone-error.log',
      out_file: '/var/log/pm2/matelibre-clone-out.log',
      log_file: '/var/log/pm2/matelibre-clone.log',
      time: true
    }
  ]
};
