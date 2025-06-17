/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Use outputFileTracing to control what gets included in functions
  outputFileTracing: true,
  outputFileTracingExcludes: {
    "*": [
      // Exclude heavy AI/ML dependencies from all functions
      "node_modules/onnxruntime-node/**/*",
      "node_modules/@huggingface/transformers/**/*",
      "node_modules/chromadb/**/*",
      "node_modules/sharp/**/*",
      "node_modules/pdf-parse/**/*",
      // Exclude other heavy dependencies
      "node_modules/@img/**/*",
      "node_modules/@effect/**/*",
      "node_modules/effect/**/*",
      "node_modules/fast-check/**/*",
      // Exclude development/build artifacts
      ".next/**/*",
      "node_modules/.cache/**/*",
      "node_modules/.bin/**/*",
      // Exclude test files
      "**/*.test.js",
      "**/*.test.ts",
      "**/*.spec.js",
      "**/*.spec.ts",
      // Exclude documentation
      "**/README.md",
      "**/CHANGELOG.md",
      "**/LICENSE*",
      "**/*.d.ts.map",
    ],
  },

  // Only include necessary files for specific API routes
  outputFileTracingIncludes: {
    // For uploadthing API - only include essential files
    "/api/uploadthing": [
      "./src/lib/session.js",
      "./src/data-access/files.js",
      "./src/db/index.js",
    ],
    // For other API routes that don't need heavy dependencies
    "/api/messages/**": [
      "./src/lib/session.js",
      "./src/data-access/messages.js",
      "./src/db/index.js",
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

  experimental: {
    // Keep heavy packages external to server components
    serverComponentsExternalPackages: [
      "onnxruntime-node",
      "@huggingface/transformers",
      "chromadb",
      "sharp",
      "pdf-parse",
    ],
  },

  // Use standalone output for better optimization
  output: "standalone",
};

export default nextConfig;
