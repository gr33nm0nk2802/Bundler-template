const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const {CleanWebpackPlugin} =require('clean-webpack-plugin');

module.exports ={
	context: path.resolve(__dirname,'src'),
	entry: './style.scss',

	module: {
		rules:[
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /.(scss|css)$/,
				exclude: /node_modules/,
				use:[{
						loader: MiniCssExtractPlugin.loader,
						options:{
							reloadAll: true
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(svg|gif)$/i,
				loader: 'file-loader',
				options:{
					name:'[name].[hash:6].[ext]',
					outputPath: 'images',
					publicPath: 'images',
					emitFile: true,
					esModule: false
				}				
			},
			{
				test: /\.(jpeg|png|jpg)$/i,
				use:[
					{
						loader: 'file-loader',
						options:{
							name:'[name].[hash:6].[ext]',
							outputPath: 'images',
							publicPath: 'images',
							emitFile: true,
							esModule: false
						}
					},
					{
						loader:'webp-loader',
						options:{
							quality:13
						}
					}
				]
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new MinifyPlugin({},{
			comments:false
		}),
		new HtmlWebpackPlugin({
			title:'Voltfraction | Home',
			template: 'views/index.html',
			filename: 'index.html',
			minify: true
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns:['**/*',"!static/**","!Readme.md"]
		}),
		new HtmlWebpackPartialsPlugin({
			path: path.join(__dirname,'./src/views/partials/navigation.html'),
			location: 'navigation',
			template_filename: ['index.html'],
			options:{
					appName: 'Appname'
			}
		})
	]
}