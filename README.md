### API风格统一使用同步的async/await的形式
### 版本管理
```
可以设置package.json中的version,打出不同版本的包
设置package.json中的name，设置项目名称配置打包输出的文件夹名称
```

### 环境变量
```javascript
// 更改环境必须重新npm run serve
.env.development // 本机环境变量
.env.dev // 开发环境变量
.env.test // 测试环境变量
.env.prod // 生产环境变量
```

### 项目命令
```javascript
npm install // 安装依赖
npm run serve // 开启服务
npm run build:dev // 打包dev环境
npm run build:test // 打包test环境
npm run build:prod // 打包prod环境
npm run lint // eslint检查代码
npm run inspect // 打印项目webpack配置到根目录webpackConfig.js
npm run build:dll // webpackDllplugin打包第三方依赖，加快打包速度
npm run svgo // 消除svg多余的内容
npm run test // 单元测试
```

### 项目目录
**dll**
存放打包的第三方依赖库
**public**
+ index.html
+ static 存放静态资源目录

**src**
+ api 业务接口
+ assets 存放资源目录（css,图片）
+ components 公共组件（只存放项目公共组件）
    
    - svg-icon 存放svg组件
    
    - table 对element-ui的table做二次封装
    
    - transition 过渡效果
    
+ consts 放置一些常量，防止全局常量冲突（例如storage）
+ http 存放HTTP请求
    - index.js     axios封装

    - url.js 开发环境的url存放

+ icons 存放项目内嵌图标的svg

+ layout 项目整体布局

+ mixins 全局的混入方法

+ plugins 引用插件（可用于按需引入UI组件）
    - element.js vue add element(选择按需引入，会自动生成配置)

+ router 路由
    - modules 模块化,自行添加

    - index.js 实例化router对象

    - permission.js  做路由的权限控制

+ store 全局状态管理
    - modules 模块化
    - index.js 实例化vuex.store对象
    - getters.js 

+ styles 存放样式文件

    - index.scss 全局样式

    - mixins.scss 定义的混入样式
    - transition.scss 过渡动画css
    - variables.scss 定义一些变量

+ utils 公用的一些东西

  + storage.js  封装sessionStorage方法
  + validate.js  存放校验方法

+ views 页面（可根据页面或者板块划分文件夹）

+ babel.config.js  babel配置
+ vue.config.js  webpack配置
+ webpack.dll.js 第三方依赖配置

### 配置Webpack Dllplugin

在webpack.dll.js中的   `vendors`   直接添加第三方依赖库，然后执行`npm run build:dll` 命令即可

具体参考博客https://blog.csdn.net/qq_35993607/article/details/99584035

### 内嵌svg图标

将svg文件添加到icons的svg文件夹下即可在组件中使用, icon-class传入文件名

```
<svg-icon icon-class="user" />
```



