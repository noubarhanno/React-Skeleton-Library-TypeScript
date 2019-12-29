module.exports = {
    webpackConfig: {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ]
      }
    },
  };