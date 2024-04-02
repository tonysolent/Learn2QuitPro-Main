module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Add Babel loader for JSX files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'], // Use Next.js Babel preset
        },
      },
    });

    return config;
  },
};
