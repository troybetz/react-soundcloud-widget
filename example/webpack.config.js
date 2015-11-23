module.exports = {
  entry: `${__dirname}/index.js`,
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ],
  },
};
