const path = require('path');

module.exports = {
	entry: './src/index.ts',
	experiments: {
		topLevelAwait: true
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				type: 'asset/resource'
			}
		]
	},
	resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/app')
        },
		extensions: ['.ts', '.js', '.tsx'],
	}
};