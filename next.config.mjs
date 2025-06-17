/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Externalize heavy dependencies completely
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        chromadb: "chromadb",
        "onnxruntime-node": "onnxruntime-node",
        "@huggingface/transformers": "@huggingface/transformers",
        "@google/generative-ai": "@google/generative-ai",
        "pdf-parse": "pdf-parse",
        sharp: "sharp",
      });
    }

    // Ignore binary files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.node$/,
      use: "ignore-loader",
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      "chromadb",
      "@huggingface/transformers",
      "onnxruntime-node",
      "pdf-parse",
      "@google/generative-ai",
      "sharp",
    ],
  },
  // Add output configuration
  output: "standalone",
};

export default nextConfig;
