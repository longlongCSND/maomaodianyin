module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target:'http://39.97.33.178',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //'^/api':'/mock/68837/api', // rewrite path

        },
      }

    }
  }
}
