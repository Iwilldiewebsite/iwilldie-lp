import path from 'path'
import webpack from 'webpack'
import vendorChunkPlugin from 'webpack-vendor-chunk-plugin'

module.exports = {
	devtool: 'source-map',

	entry: {
		app: './app/app.js',
		vendors: ['angular', 'angular-ui-router', 'angular-animate']
		// someone needs to come in and add in the other vendor dependencies,
		// I'm not sure what they need to be required as
	},

	output: {
		path: path.resolve(__dirname, 'whereever-we-want-es6-nonminified-code-to-go');
		publicPath: '/',
		filename: '[name].js'
	},

	module: {
		// can put preloaders here to test, will do soon

		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			},

			{
				test: /\.json$/,
				loader: 'json'
			}
		],

		plugins: [
			new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
			new vendorChunkPlugin('vendors'),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin()
		]
	}
}