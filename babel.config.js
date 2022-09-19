const presets = ['module:metro-react-native-babel-preset', 'babel-preset-expo']
const plugins = []

plugins.push(
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        '@': './src',
      },
    },
  ],
  'react-native-reanimated/plugin',
)

module.exports = function(api) {
  api.cache(true);
  return {
    presets,
    plugins,
  };
};