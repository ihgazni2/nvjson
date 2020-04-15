const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "nvjson.js",
    path: path.resolve(__dirname, "dist"),
    library: "NVJSON",
    libraryTarget: "umd",
    globalObject: "this"
  },
  node:{
      fs:'empty'    
  },
  mode: "production",
  devtool: "source-map"
};

