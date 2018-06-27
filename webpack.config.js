const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
	entry:'./src/index.js',
	mode:'development',
	output:{
		path:path.resolve(__dirname,'dist/'),
		filename:'js/bundle.js'
	},
	devServer:{
		contentBase: path.resolve(__dirname,'dist'),
		port:9000
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:path.resolve(__dirname,'node_modules'),
				use:{
					loader:'babel-loader'
				}
			},
			{
				test:/\.scss$/,
				use:[
					{
						loader:MiniCssExtractPlugin.loader,
						options:{
							publicPath:'dist/css/'
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/,
				use:{
					loader:'file-loader',
					options:{
						name:'[name][hash].[ext]',
						outputPath:'assets/images/'
					}
				}			
			}			
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'css/[name].css',
			path:__dirname+'dist/'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'src/index.html'
		})
	]
}
