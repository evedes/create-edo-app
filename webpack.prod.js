const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
})