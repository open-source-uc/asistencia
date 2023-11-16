module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
          extensions: [".js", "jsx", ".ts", "tsx", ".ios.js", ".android.js"],
        },
      ],
      ['expo-router/babel'],
    ],
  };
};
