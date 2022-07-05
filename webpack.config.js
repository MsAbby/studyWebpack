const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require("path");
const Eslintrc = require("./.eslintrc");
const HtmlWebpckPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口
    entry: './src/main.js', // 相对路径
    // 出口
    output: {
        // 文价输出路径
        // __dirname, nodejs 的变量， 代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js',
        clean: true, // 打包前， 将path整个目录清空
    },
    // 加载器
    module: {
        // 执行顺序： 从下到上
        rules: [
            {
                test: /\.css$/, // 仅监测css文件
                use: ['style-loader', 'css-loader'] // 执行顺序「从右到左」
            },
            {
                test: /\.less$/, 
                use: ['style-loader', 'css-loader', 'less-loader'] // 执行顺序「从右到左」
            },
            {
                test: /\.s[ac]ss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader'] // 执行顺序「从右到左」
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'] // 执行顺序「从右到左」
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/, 
                type: 'asset', // 转base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    // 输出图片名称
                    filename: '/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(tts|woff)$/,
                type: 'asset/resource', // 原名字输出
                generator: {
                    // 输出图片名称
                    filename: '/media/[hash][ext][query]'
                }
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, // 排除的文件
                loader: "babel-loader"
            }
            
        ]
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, 'src')
        }),
        new HtmlWebpckPlugin()
    ],

    // 开启服务器
    devServer: {
        host: 'localhost', // 开启服务器域名
        port: 8080,
        open: true, // 是否自动打开浏览器
    },
    // 模式
    mode: 'development'
}