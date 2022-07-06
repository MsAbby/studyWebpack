## 学习webpack基本配置
1. 新建入口文件：         ----src/main.js<br/>
2. 初始化package.json:   ----npm i<br/>
3. 安装webpack:          ----npm install webpack webpack-cli -D<br/>
4. 创建:                 ----webpack.config.js 文件<br/>
5. 启动：                ----npx webpack<br/>
    > webpack ： ----直接打包输出
    > webpack server ----启动开发服务器， 内存编译打包，没有输出

## webpack.config.js
1. 入口： ----entry<br/>
2. 出口： ----output<br/>
3. 加载器： ----module: {}(loader)<br/>
4. 插件： ----plugins: []<br/>
5. 服务器： ----devServer: {}<br/>
6. 环境模式： ----mode<br/>
    > mode: development: 1. 编译代码， 能在浏览器中「自动」运行; 2. 代码质量检查<br/>
    > mode: production:  1. 编译代码， 优化输出<br/>
7. 所有的优化代码 / 压缩部分:   optimization： {// 压缩 minimizer : [], spliteChunks： {}} <br>

## 处理样式资源
1. style-loader    npm install style-loader -D   在js中找到css样式， 通过创建style 标签，添加到html中<br/>
2. css-loader :    npm install css-loader -D     将css资源编译到commonjs模块的js中<br/>
3. scss-loader:    npm install scss-loader node-scss -D<br/>
4. sass-loader:    npm install sass-loader -D<br/>
5. less-loader:    npm install less-loader -D<br/>
6. stylus-loader:  npm install stylus-loader -D<br/>

## 1. 处理图片资源
1. file-loader： npm i url-loader file-loader html-loader -D<br/>
2. url-loader<br/>
3. webpack5 不用配置： 激活1、2就可以了<br/>
4. 图片优化<br/>

## 2. 修改打包输出js文件
1. path: 所有文件<br/>
2. filname: '/文件名/filename'<br/>

## 3. 自动清空打包内容
````js
output: {
    clean: true
}
````

## 4. 处理字体图标资源
<link rel='stylesheet' herf='./iconfont.css'><br/>
````js
module: {
    rule: [
        {
            test: /\.(ttf|woff)$/,
            type: 'assets/resource'
        }
    ]
}
````

## 5. 其他资源
````js
module: {
    rule: [
        {
            test: /\.(ttf|woff｜map|map4|avi)$/,
            type: 'assets/resource'
        }]}
````
## 6. 处理js资源(babel 处理js兼容性问题)

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


## 7. 处理html(手动引入的变成自动引入)
 ## 自动引入打包输出的资源
1. htmlwebpackPlugin<br/>

## 8. 自动化
   ## 每次改完代码后，要手动编译才能生效，比较麻烦
1. dev-server:   npm install dev-server -D<br/>
````
 devServer: {
        host: 'localhost', // 开启服务器域名
        port: 8080,
        open: true, // 是否自动打开浏览器
    },
````




===================================   生产相关  ======================================






## 生产模式
   ### 上线操作
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

## 生产模式 - css处理(提取css)
1. 原因： ----css打包进js, js加载时，创建style标签生成样式， 屏幕是闪屏现象(把style-loader替换成minicssStrctPlugin)<br/>
2. 解决： ----link标签加载css， 性能比较好<br/>
3. 下载： ----npm install mini-css-extract-plugin -D <br/>
4. 目的： ----js和css分离<br/>

````js
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

## 生产模式 - css兼容性处理
1. 下载包：  ----npm install postcss-loader postcss postcss-preset-env -D<br/>
2. 配置为止： ----在css-loader 后面， 在less/scss/stylus-loader前面<br/>
3. 对象形式： 

````js
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

## 生产模式 - 封装loader函数（重复代码处理）
1. 抽取公共代码， 封装成函数

````js
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
module: {
        // 执行顺序： 从下到上
        rules: [
            {
                test: /\.less$/, 
                // use: ['style-loader', 'css-loader', 'less-loader'] // 执行顺序「从右到左」
                use: getStyleLoader('less-loader') // 执行顺序「从右到左」
            },
````

## 生产模式 - css压缩

1. 下载： ----npm install css-minimizer-webpack-plugin -D <br>
2. 引用   <br>
3. plugin调用<br>

````js
const CssMinimizerWebpckPlugin = require('css-minimizer-webpack-plugin')

plugins: [
    new CssMinimizerWebpckPlugin()
],

````

## 生产模式 - html压缩

生产环境： html 和 js 默认开启了压缩， 不需要进行配置<br><br><br><br>






===================================  webpack 高级配置  ===================================<br><br><br>






> 1. 提升 「 开发体验 」<br>
> 2. 提升 「 打包构建速度 」<br>
> 3. 减少 「 代码体积 」<br>
> 4. 优化 「 运行代码性能 」<br>

> 答题思路： 为什么 - 是什么 - 怎么用<br>

## 1. SourceMap

1. 为什么？    ----代码构建后，如果文件出错，找不到具体的行和列<br>
2. 是什么？    ----生成一个map文件， 内容是「 源代码 」和 「 构建后的代码 」 每一行和每一列 的映射关系；<br>
3. 解决什么？   ----构建代码出错， 通过map文件，找到「源代码」出错的位置， 快速定位错误，便于调试<br>
4. 怎么用？<br>  

````js
devTool：  none / eval / eval-cheap-source-map/source-map ....
1. 开发模式：
    // 只有「 行 」的映射关系， 速度快
    module.export = {
        mode: "development"
        devtool: "cheap-module-source-map"
    }
2. 生产环境
    // 「 行和列 」的映射关系
    module.export = {
        mode: "production"
        devtool: "source-map"
    }

````

## 2. 提升「打包构建速度」- hotModuleReplacement (仅开发模式)

1. 为什么？    ----开发时， 改某一模块代码， 所有文件要重新打包编译(整个页面全部刷新)， 速度变慢<br>
2. 是什么？    ----`hotModuleReplacement`（热模块配置）, 程序运行中, 替换、添加/删除模块， 无需重新加载整个页面<br>
3. 怎么用？

````js
devServer: {
    hot: false // 热模块开启还是关闭： true： 开启， false: 关闭
},
// 判断是支持hmr功能
if (module.hot) {
    module.hot.accept('./js', function() {
        console.log('iii')
    })
}
````

## 3. 提升「打包构建速度」 - OneOf (开发和生产模式)

1. 为什么？   ----打包时， 每个文件都会经过「所有loader」处理， 虽然因为正则， 实际没有处理上， 但是都经过一遍， 比较慢<br>
2. 是什么？   ----只能匹配一个loader, 剩下就不匹配了<br>
3. 怎么用？
````js
module: {
    rules: [
        {
            // 每个文件只能被其中一个loader处理
            oneOf: [
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
        }
    ]
}
````
## 4. 提升「打包构建速度」 - include/exclude（针对第三方插件的js文件）

1. 为什么？    ----开发时， 用到第三方插件， 会下载到node_module中， 这些文件「不需要编译，可以直接使用」，所以要排除文件 <br>
2. 是什么？    ----include:  包含；     exclude: 排除   （2选一）
3. 怎么用？

````js
// 只针对 「js」文件, 同时使用「会报错」
{
    test: /\.js$/, 
    exclude: /node_modules/, // 排除的文件
    // include: path.resolve(__dirname, '../src')  // 处理包含的文件
    loader: "babel-loader"
}
plugins: [
    new ESLintWebpackPlugin({
        // 检测哪些文件
        context: path.resolve(__dirname, '../src'),
        exclude: "node_modules", // 排除的文件
    }),
],
````

## 5. 提升「打包构建速度」- eslint 和 babel 的缓存

1. 为什么？  ----每次打包js, 都要经过eslint检查  和  babel编译，速度慢 <br>
2. 是什么？  ----对 「 eslint检查 」  和 「 babel编译结果」，  进行缓存， 只对修改的文件进行检查编译 <br>
3. 作用？    ----针对「第二次打包」， 不用打包所有， 速度变快 <br>
4. 怎么用？  

````js

// loader
{
    test: /\.js$/, 
    exclude: /node_modules/, // 排除的文件
    loader: "babel-loader",
    options: {
        cacheDirectory: true, // 开启 「babel」缓存
        cacheCompression: false /// 关闭缓存文件压缩
    }
}
plugins: [
    new ESLintWebpackPlugin({
        // 检测哪些文件
        context: path.resolve(__dirname, '../src'),
        exclude: "node_modules", // 排除的文件
        cache: true,        // eslint 开启缓存
        cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')  // 缓存位置

    }),
],
````

## 6. 提升「打包构建速度」 -  多进程打包 thread(生产环境)
1. 为什么？  ----项目庞大， 打包速度变慢， 提升js打包速度（eslint, babel, terser）， 采用多线程打包<br>
2. 是什么？  ----多个进程， 同时干一件事， 速度快， （缺点：每个进程启动600ms左右开销）<br>
3. 下载：    ----npm install thread-loader -D<br>
4. 怎么用？ <br>

````js
const os = require('os')
const threads = os.cpus().length; // cpu核数
{
    test: /\.js$/, 
    exclude: /node_modules/, // 排除的文件
    use: [
        {
            loader: 'thread-loader',
            options: {
                works: threads  // 进程数量
            }
        },
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false // 关闭缓存文件压缩
            }
        }
    ]
}
plugins: [
    new ESLintWebpackPlugin({
        // 检测哪些文件
        context: path.resolve(__dirname, '../src'),
        threads // 开启多进程 和 设置进程数量
    }),
    new TerserWebpackPlugin({
        parallet: threads // 开启多进程  和设置进程数量
    })
],

````

## 7. 减少「代码体积」 -  tree shaking
1. 为什么？   -----开发时， 定义了一些工具函数或引入第三方库， 但是我们只是使用了一小部分， 打包时，会把整个库打包进来， 体积太大<br>
2. 是什么？   -----移除js中没有使用的代码 （依赖es module)
3. 怎么用？   -----webpack 已经自动开启了这个功能， 无需配置

## 8. 减少「代码体积」 -  babel （开发 / 生产模式都可以）
1. 为什么？  ------babel 为每个文件都插入了辅助代码， 使体积过大（重复使用，重复引入）
2. 是什么？  ------npm install @babel/plugin-transform-runtime: -D
3. 怎么用？
````js
@babel/plugin-transform-runtime:  禁用babel 自动对每个文件的runtime注入， 而是引入@babel/plugin-transform-runtime, s使所有辅助代码从这里引用

{
    test: /\.js$/, 
    exclude: /node_modules/, // 排除的文件
    use: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false, // 关闭缓存文件压缩
                plugins: ['@babel/plugin-transform-runtime'] // 减少代码体积
            }
        }
    ]
}

````

## 9. 减少「代码体积」 -  压缩图片
1. 为什么？  -----图片引用过多， 体积变大， 请求速度比较慢 （在线图片的话就不需要）<br>
2. 是什么？  -----image-minimizer-webpack-plugin: 用来压缩图片的插件<br>
3. 下载？   -----npm install image-minimizer-webpack-plugin -D<br>
4. 无损压缩  -----npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D<br>
5. 有损压缩  ----- npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D<br>
6. 怎么做？

````js
// 开启 图片 压缩
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ['gifsicle', {interlaced: true}],
                        ['jpegtran', {progressive: true}],
                        ['optipng', {optimizationLevel: 5}],
                        ['svgo', {
                            plugins: [
                                "preset-default",
                                "prefixIds",
                                {
                                    name: "sortAttrs",
                                    params: {
                                        xmlnsOrder: "alphabetical"
                                    }
                                }
                            ]
                        }]
                    ]
                }
            }
        })
````
<br>

## 1 . 优化「代码运行性能」 -  code split

1. 为什么？ ---- 打包在一个文件中，体积太大，所以要进行代码分割，加载需要的资源，资源快
2. 是什么？ ---- 1.分割文件（生成多个js文件）， 2.按需加载
3. 怎么用？

````js
// 1. 多入口 对应 多输出
entry: {
    app: './src/app.js',
    main: './src/main.js'
},
output: [
    path: path.resolve(__dirname, 'dist)
    filename: "[name].js" // 以文件名自己命名
],
plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html)
    })
]

// 2. 提取公共模块（防止重复引入）-公共模块单独打包

optimization: {
    // 所有的优化代码 / 压缩部分
    // 代码分割配置
    splitChunks: {
        chunks: "all", // 对所有模块分割
        // 以下是默认配置
        minSize: 20000, // 分割代码最小的大小
        minnChunks: 1, // 至少被引用的次数，满足条件才会代码分割
        cacheGroup: { // 组， 哪些模块打包到一个组
            defaultVendors: { // 组名
                test: //
            },
            default: { // 多入口
                minSize: 0,
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
}


// 3. 按需加载， 动态导入模块
document.getElementById('#btn).onclick = ()=>{
    import('./count.js).then(res => {

    }).catch(err => {})
}


// 4. 按需加载， 动态导入模块-起名
document.getElementById('#btn).onclick = ()=>{
    import(/*webpackChunkName*/'./count.js).then(res => {

    }).catch(err => {})
}
output: {
    // 给打包输出的其他文件命名（动态加载后的）
    chunkFileName: 'static/[name].js"
}


// 5. 统一命名

output: {
    fileName: 'static/[name.js]'
    // 给打包输出的其他文件命名（动态加载后的）
    chunkFileName: 'static/[name].chunk.js"
    // 图片、字体 通过 ：type: assets
    assetModuleFilname: "static/media/[hash:10][ext][query]"
}
````

## 2 . 优化「代码运行性能」 -  preload / prefetch
1. 为什么？    ----代码分割、动态导入， 加载速度不好， 若资源大，会明显感觉卡顿<br>
2. preload？  ----告诉浏览器，「 立即加载 」（优先级高， 只加载当前资源）；<br>
3. prefetch:  ----告诉浏览器「 空闲 」时，才开始加载资源（可以加载下一页面的资源）<br>
4. 共同点？     ---- 都只「加载」资源， 并不执行， 都有缓存<br>
5. 缺点？       ---- 兼容性差<br>
6. 下载？       ----npm i @vue/preload-webpack-plugin -D<br>

````js
new PreloadWebpackPlugin({
    // rel: 'preload',
    // as: 'script'
    rel: 'prefetch'
})
````

## 3 . 优化「代码运行性能」 -  文件名缓存
1. 模块间相互依赖， 一个依赖的文件修改，与他相关的所有文件名都会变化
````js
optimization: {
    // 压缩的
    minimizer: []，
    // 代码切割的
    splitChunks: {},
    // 文件依赖的文件名缓存
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`
    }
}
````

## 4 . 优化「代码运行性能」 -  兼容性问题core.js
1. 为什么？   ---- babel对js兼容性处理了， 将es6语法转换， 但是， 异步函数，promise对象，数组的一些方法，无法处理<br>
2. corjs?    ---- es6以及以上api 的polyfill<br>
3. polyfill? ---- 垫片/补丁， 用社区上提供的代码，让在不兼容某些新特性的浏览器上， 使用该新特性   l<br>
4. 怎么做？

````js
 全部加载---- npm install core-js
 手动按需加载 ---- import "core-js/es/promise"
 自动引入 ---- babel 智能预设

 module.export = {
     preset: [
         "@babel/preset-env",
         {
            useBuiltIn: 'usage' // 按需加载core-js( 自动分析 兼容性的js)
            corejs: 3
         }
     ]
 }

````

## 5. 优化「代码运行性能」 -  pwa(离线)
1. 为什么？ ----开发webapp, 一旦断网， 无法访问<br>
2. 渐进式网络应用程序（workbox-webpack-plugin）
3. 下载？   ---- cnpm install workbox-webpack-plugin -D<br>
3. 怎么做？

````js
new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
})

// main.js中要注册
if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }

````