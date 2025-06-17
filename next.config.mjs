/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure output file tracing properly
  experimental: {
    // Keep heavy packages external to server components
    serverComponentsExternalPackages: [
      "onnxruntime-node",
      "@huggingface/transformers",
      "chromadb",
      "sharp",
      "pdf-parse",
      "@img/sharp-libvips-linuxmusl-x64",
      "@img/sharp-libvips-linux-x64",
      "@effect/platform",
      "effect",
      "fast-check",
    ],
    // Exclude heavy dependencies from output file tracing
    outputFileTracingIgnores: [
      "node_modules/onnxruntime-node/**/*",
      "node_modules/@huggingface/transformers/**/*",
      "node_modules/chromadb/**/*",
      "node_modules/sharp/**/*",
      "node_modules/pdf-parse/**/*",
      "node_modules/@img/**/*",
      "node_modules/@effect/**/*",
      "node_modules/effect/**/*",
      "node_modules/fast-check/**/*",
    ],
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // For server-side, externalize heavy dependencies
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        // Externalize heavy dependencies so they're not bundled
        "onnxruntime-node": "commonjs onnxruntime-node",
        "@huggingface/transformers": "commonjs @huggingface/transformers",
        chromadb: "commonjs chromadb",
        sharp: "commonjs sharp",
        "pdf-parse": "commonjs pdf-parse",
      });
    }

    // Ignore binary files that cause webpack issues
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.node$/,
      use: "ignore-loader",
    });

    return config;
  },

  // Use standalone output for better optimization
  output: "standalone",
};

export default nextConfig;
