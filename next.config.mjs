/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Externalize ChromaDB and related dependencies for server-side
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        chromadb: "commonjs chromadb",
        "onnxruntime-node": "commonjs onnxruntime-node",
        "@huggingface/transformers": "commonjs @huggingface/transformers",
      });
    }

    // Ignore specific binary files that cause webpack issues
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.node$/,
      use: "ignore-loader",
    });

    // Add rule to handle HTTPS URLs in ChromaDB
    config.module.rules.push({
      test: /chromadb/,
      resolve: {
        fallback: {
          https: false,
          http: false,
          url: false,
        },
      },
    });

    return config;
  },
  experimental: {
    // Disable static optimization for API routes that use ChromaDB
    serverComponentsExternalPackages: [
      "chromadb",
      "@huggingface/transformers",
      "uploadthing",
      "pdf-parse",
    ],
  },
};

export default nextConfig;
