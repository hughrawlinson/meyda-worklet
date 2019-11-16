module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.worklet\.js$/,
        use: [
          {
            loader: 'worklet-loader',
            options: {
              inline: true
            }
          },
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env']
          //   }
          // }
        ]
      }
    ]
  }
}
