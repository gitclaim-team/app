/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals.push("pino-pretty");
    
    // Handle HeartbeatWorker module compatibility
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'export {};',
        replace: '',
        flags: 'g'
      }
    });
    
    return config;
  },
};

module.exports = nextConfig;
