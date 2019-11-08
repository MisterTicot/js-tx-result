module.exports = {
  entry: "./es5/index.js",
  output: {
    path: __dirname + "/web/",
    filename: "tx-result.js",
    library: "txResult",
    libraryTarget: "umd"
  },
  devtool: "source-map"
}
