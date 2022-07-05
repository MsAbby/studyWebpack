module.exports = {
    // ENV：环境
    env: {
        node: true, // 启用node 中的全局变量
        browser: true, // 启用浏览器中的全局变量
    },
    // 2. 解析选项
    parserOptions: {
        ecmaVersion: 6, // es版本语法
        sourceType: 'module', // es模块化
        // ecmaFeature: {
        //     jsx: true // react项目，就开启jsx语法
        // }
    },
    // 3. 具体检查规则
    rule: {
        semi: 'error', // '禁止使用分号'
        'no-var': 2, // 不能使用 var 定义变量
    },
    // 4. 继承其他规则
    extends: []
}