const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require("path");
const Eslintrc = require("../.eslintrc");
const HtmlWebpckPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
    // 入口
    entry: './src/main.js', // 相对路径(相对于运行代码的目录)
    // 出口
    output: {
        // 文价输出路径
        // __dirname, nodejs 的变量， 代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'),
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
                // include: path.resolve(__dirname, '../src')  // 处理包含的文件
                loader: "babel-loader",
                options: {
                    cacheDirectory: true, // 开启 「babel」缓存
                    cacheCompression: false /// 关闭缓存文件压缩
                }
            }
            
        ]
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules", // 排除的文件
            cache: true, // eslint 开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')

        }),
        new HtmlWebpckPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new PreloadWebpackPlugin({
            // rel: 'preload',
            // as: 'script'
            rel: 'prefetch'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],

    // 开启服务器
    devServer: {
        host: 'localhost', // 开启服务器域名
        port: 8080,
        open: true, // 是否自动打开浏览器
        hot: false // 热模块开启还是关闭： true： 开启， false: 关闭
    },
    // 模式
    mode: 'development',
    devtool: 'cheap-module-source-map'
}