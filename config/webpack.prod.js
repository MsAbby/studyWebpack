const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require("path");
const Eslintrc = require("./.eslintrc");
const HtmlWebpckPlugin = require('html-webpack-plugin')
const miniCssExtracPlugin = require('mini-css-extract-plugin') // 替换style-loader
const CssMinimizerWebpckPlugin = require('css-minimizer-webpack-plugin')

// 封装处理样式的loader
function getStyleLoader(params) {
    return [
        miniCssExtracPlugin.loader, 
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['postcss-preset-env'] // 解决大多数样式的兼容性
                }
            }
        },
        params
    ].filter(Boolean) // 过滤undefined的值（参数传过来为null时自动过滤）
}
module.exports = {
    // 入口
    entry: './src/main.js', // 相对路径（相对于运行代码的目录）
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
                // use: ['style-loader', 'css-loader'] // 执行顺序「从右到左」
                use: [
                    miniCssExtracPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'] // 解决大多数样式的兼容性
                            }
                        }
                    }
                ] // 执行顺序「从右到左」
            },
            {
                test: /\.less$/, 
                // use: ['style-loader', 'css-loader', 'less-loader'] // 执行顺序「从右到左」
                use: getStyleLoader('less-loader') // 执行顺序「从右到左」
            },
            {
                test: /\.s[ac]ss$/, 
                // use: ['style-loader', 'css-loader', 'sass-loader'] // 执行顺序「从右到左」
                use:  getStyleLoader('sass-loader')
            },
            {
                test: /\.styl$/,
                // use: ['style-loader', 'css-loader', 'stylus-loader'] // 执行顺序「从右到左」
                use:  getStyleLoader('stylus-loader')
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
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpckPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new miniCssExtracPlugin(),
        new CssMinimizerWebpckPlugin()
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