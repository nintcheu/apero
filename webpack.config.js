const path = require('path');

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
                include: [path.resolve(__dirname, 'src')],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: 'dist/public/js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/public/js')
    },

}