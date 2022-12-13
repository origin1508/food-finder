module.exports = {
  apps: [
    {
      name: "api-server",
      script: "./server-register.js",
      instances: 3,
      exec_mode: "cluster",
      merge_logs: true,
      watch: true,
    },
  ],
};
