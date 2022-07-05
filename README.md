# 学习webpack
1. 新建入口文件：         src/main.js<br/>
2. 初始化package.json:   npm i<br/>
3. 安装webpack:          npm install webpack webpack-cli -D<br/>
4. 创建:                 webpack.config.js 文件<br/>
5. 启动：                 npx webpack<br/>

# webpack.config.js
1. 入口： entry<br/>
2. 出口： output<br/>
3. 加载器： module: {}(loader)<br/>
4. 插件： plugins: []<br/>
5. 模式： mode<br/>
    > mode: development: 1. 编译代码， 能在浏览器中运行; 2. 代码质量检查<br/>

# 处理样式资源
1. style-loader    npm install style-loader -D   在js中找到css样式， 通过创建style 标签，添加到html中<br/>
2. css-loader :    npm install css-loader -D     将css资源编译到commonjs模块的js中<br/>
3. scss-loader:    npm install scss-loader node-scss -D<br/>
4. sass-loader:    npm install sass-loader -D<br/>
5. less-loader:    npm install less-loader -D<br/>
6. stylus-loader:  npm install stylus-loader -D<br/>

# 处理图片资源
1. file-loader： npm i url-loader file-loader html-loader -D<br/>
2. url-loader<br/>
3. webpack5 不用配置： 激活1、2就可以了<br/>
4. 图片优化<br/>

# 修改打包输出js文件
1. path: 所有文件<br/>
2. filname: '/文件名/filename'<br/>

# 自动清空打包内容
output: {<br/>
    clean: true<br/>
}<br/>

# 处理字体图标资源
<link rel='stylesheet' herf='./iconfont.css'><br/>
````
module: {
    rule: [
        {
            test: /\.(ttf|woff)$/,
            type: 'assets/resource'
        }
    ]
}
````

# 其他资源
````
module: {
    rule: [
        {
            test: /\.(ttf|woff｜map|map4|avi)$/,
            type: 'assets/resource'
        }]}
````
# 处理js资源(babel 处理js兼容性问题)

> webpack 不认识任何es6语法<br/>
> 先完成代码检查 eslint, 再由 babel做兼容性处理<br/>

.eslintrc.js 文件<br/>

1. eslint:  用于检查  js 和 jsx 语法的工具（ 看eslint的配置文件 ）<br/>
2. eslint 配置文件：<br/> 
   .eslintrc / .eslintrc.js / eslintrc.json  (区别： 配置格式不一样)<br/>

3. 以.eslintrc.js为例<br/>
4. 安装插件：      npm install eslint-webpack-plugin eslint -D<br/>

.eslintignore: 可以忽略一些文件不遵循eslint规则<br/>


> babel做兼容性处理

1. babel: 将高级语法， 转换成向后兼容的 js语法<br/>

2. 配置文件：<br/>
    a. babel.config ( babel.config.js / json): 新建文件，位于项目根目录<br/>
    b. .babelrc (.babelrc / .babelrc.js / .babelrc.json): 新建文件，位于项目根目录<br/>
    c. package.json中的babel: 不需要创建文件，在原有文件上写<br/>

3. 配置项<br/>
````
    module.export = {
        // 预设： 扩展babel功能
        preset: []
    }
    @babel/preset-env:          只能预设， 允许使用最新的js
    @babel/preset-react:        编译jsx语法的预设
    @babel/preset-typescript:   编译ts的预设
````
4. 安装： npm install babel-loader @babel/core @babel/preset-env -D<br/>

5. 配置js<br/>
````
{
    test: /\.js$/, 
    exclude: /node_modules/, // 排除的文件
    loader: "babel-loader"
}
// babel.config.js
module.export = {
    // 预设： 扩展babel功能
    preset: ["@babel/prese-env"]
}
````


# 处理html(手动引入的变成自动引入)
 ## 自动引入打包输出的资源
1. htmlwebpackPlugin<br/>

# 自动化
   ## 每次改完代码后，要手动编译才能生效，比较麻烦
1. dev-server:   npm install dev-server -D<br/>
````
 devServer: {
        host: 'localhost', // 开启服务器域名
        port: 8080,
        open: true, // 是否自动打开浏览器
    },
````




------------------------- 生产相关 --------------------
# 生产模式
   ## 上线操作
1. webpack.dev.js: : 
2. webpack.prod.js: 
3. package.json 文件修改
    ````
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack server --config ./config/webpack.dev.js",
        "build": "webpack --config ./config/webpack.prod.js",
        "start": "npm run start"
    },
    ````

# 生产模式 - css处理
1. 原因： css打包进js, js加载时，创建style标签生成样式， 屏幕是闪屏现象(把style-loader替换成minicssStrctPlugin)<br/>
2. 解决： link标签加载css， 性能比较好<br/>
3. 下载：  npm install mini-css-extract-plugin -D <br/>
4. 目的： js和css分离<br/>
````
module: {
    // 执行顺序： 从下到上
    rules: [
        {
            test: /\.css$/, // 仅监测css文件
            // use: ['style-loader', 'css-loader'] // 执行顺序「从右到左」
            use: [miniCssExtracPlugin.loader, 'css-loader'] // 执行顺序「从右到左」
        },
    ]
}
// 插件
plugins: [
    new miniCssExtracPlugin()
],
````

# 生产模式 - css兼容性处理
1. 下载包： npm install postcss-loader postcss postcss-preset-env -D<br/>
2. 配置为止： 在css-loader 后面， 在less/scss/stylus-loader前面<br/>
3. 对象形式： <br/>
````
{
    test: /\.less$/, 
    // use: ['style-loader', 'css-loader', 'less-loader'] // 执行顺序「从右到左」
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
        },
        'less-loader'
    ] // 执行顺序「从右到左」
},
````

