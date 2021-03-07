const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/public'),
    compress: false,
    port: 8080
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src/')],
      },
      /*{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [path.resolve(__dirname, 'src/')],
      }*/
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: 'dist/public/js/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public/js/')
  },

  plugins: [
    // Other plugins...

    /*
    new WorkboxPlugin.GenerateSW({
      // Do not precache images
      exclude: [/\.(?:png|jpg|jpeg|svg|js|css)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg|js|css)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'staticFiles',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }]
    }),
    */


    // Other plugins...
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/service/sw-define.ts',
      swDest: './../sw.js',
      compileSrc: true,
      additionalManifestEntries: [
        '/',
        'offline/',
        'css/',
        'js/',
        'images/'
      ],
    })
  ],


}