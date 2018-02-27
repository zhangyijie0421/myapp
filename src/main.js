// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsadd from './components/goods/goodsadd.vue';

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes:[
        {name:'default',path:'/',redirect:'/admin'},
        {name:'login',path:'/login',component:login},
        {name:'layout',path:'/admin',component:layout,
        children:[
            {name:'goodslist',path:'goodslist',component:goodslist},
            {name:'goodsadd',path:'goodsadd',component:goodsadd}
        ]}
    ]
});

// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';
// 绑定到vue中
Vue.use(elementUI);

//5.0导入axios
import axios from 'axios';
// 5.0.1设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名了
axios.defaults.baseURL ="http://127.0.0.1:8899";
// 5.0.2将axios对象绑定到vue的原型属性$ajax上，将来在任何组件中均可以通过this.$ajax中的方法发出ajax请求
Vue.prototype.$ajax=axios;


// 3.0 实例化vue对象
new Vue({
    el:'#app',
    router,  //绑定路由对象使它生效
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});