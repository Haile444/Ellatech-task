module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // NativeWind provides a preset, not just a plugin
      "nativewind/babel",
    ],
    plugins: [
      // Reanimated's Babel plugin must come first to work correctly
      "react-native-reanimated/plugin",
    ],
  };
};