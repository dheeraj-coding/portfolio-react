const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports={
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js'
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
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/,
				use:{
					loader:'file-loader'
				}			
			},
			{
				test:/\.json$/,
				use:'json-loader'
			}			
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'[name].css',
			path:path.resolve(__dirname,'dist')
		})
	]
}
