module.exports = {
  devServer: {
    port: 3000
  },
  publicPath: "/",
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false
    }
  }
};
