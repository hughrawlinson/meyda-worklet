module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
}
