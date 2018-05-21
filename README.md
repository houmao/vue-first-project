# vue-first-project

> A Vue.js project

## vue2.0项目总结
项目github地址 https://github.com/houmao/vue-first-project.git

#### 1.安装
```sh
    # 全局安装 vue-cli
    $ npm install --global vue-cli
    # 创建一个基于 webpack 模板的新项目
    $ vue init webpack my-project
    $ cd my-project
    # 安装依赖
    $ npm install
    # 运行开发
    $ npm run dev
```
> 问题：  
> npm install 的时候出错‘Failed at the chromedriver@2.35.0 install script.
’  
> 解决方法：  
> npm install chromedriver --chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver

#### 2.图标字体
将svg文件导入到https://icomoon.io/进行图表转换

#### 3.清除浮动
```
// 现代浏览器clearfix方案，不支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

// 全浏览器通用的clearfix方案
// 引入了zoom以支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}

```
#### 4.scrollBehavior滚动行为
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。  
vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
> 注意: 这个功能只在 HTML5 history 模式下可用。  
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

```
// 与keepAlive结合，如果keepAlive的话，保存停留的位置：
new Vue({
    el: '#app',
    mode: 'history',
    router,
    store,
    components: {App},
    template: '<App/>',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})
```
  
#### 5.keep-alive使用总结
> 结合router，缓存部分页面  

使用$route.meta的keepAlive属性：
```
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
需要在router中设置router的元信息meta：  
```
//...router.js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    //所有商铺列表页
    {
        path: '/msite',
        name:'msite'
        component: msite,
        meta: { 
            keepAlive: true // 需要缓存
        },
    },
  ]
})
```

#### 6.CSS sticky footer
参看header.vue页面，实现close关闭按钮在最底部

#### 7.如何写出“响应式的1px”
* 方案一：   
>当样式像素一定时,因手机有320px,640px等.各自的缩放比差异,所以设备显示像素就会有1Npx，2Npx.解决就是用media + scale.  
> 设备上像素 = 样式像素 * 设备像素比(DPR)  
> 屏幕宽度： 320px 480px 640px  
> 设备像素比： 1   1.5    2

通过查询它的设备像素比 devicePixelRatio  
在设备像素比为1.5倍时, round(1px 1.5 / 0.7) = 1px   
在设备像素比为2倍时, round(1px 2 / 0.5) = 1px  
```
// less样式
.border-1px(@color) {
    position: relative;
    &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid @color;
        content: '';
    }
}

@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px{
        &::after {
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .border-1px{
        &::after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
}
```
* 方案二  
> viewport + rem 方法，根据设备DPR调整页面的缩放值，动态设置 html 的font-size, 进而达到高清效果。[《手机端页面自适应解决方案—rem布局》](https://segmentfault.com/a/1190000007350680)
```
const win = window;
export default win.flex = (normal, baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  const scale = normal ? 1 : 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
  doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
};
```

### 8.js中getBoundingClientRect()方法介绍
getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。   
```
 rect = el.getBoundingClientRect(); //或者元素相对位置
 top = el.getBoundingClientRect().top // 获得元素距离顶部视窗顶部位置
 ```
 > 注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。  
 
 ```
 document.documentElement.clientTop;  // 非IE为0，IE为2

document.documentElement.clientLeft; // 非IE为0，IE为2

functiongGetRect (element) {

    var rect = element.getBoundingClientRect();

    var top = document.documentElement.clientTop;

    var left= document.documentElement.clientLeft;

    return{

        top    :   rect.top - top,

        bottom :   rect.bottom - top,

        left   :   rect.left - left,

        right  :   rect.right - left

    }

}
```

#### 9.vue父组件监听子组件事件
例如：cartcontrol.vue子组件和goods.vue父组件
```
// 子组件
<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'carcontrol',
        ...
        methods: {
            addCart (event) {
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                // 使用$emit使得父组件能够监听到子组件的click事件addCart，自定义cart-add事件
                this.$emit('cart-add', event.target);
            },
            ...
        }
    }
<script/>

// 父组件goods.vue部分代码
// 使用cart-add自定义事件来控制getAdd方法，可以理解为子组件操作父组件的方法。
<div class="cartcontrol-wrapper">
    <cartcontrol :food="food" @cart-add="getAdd"></cartcontrol>
</div>

// goods.vue的js的methods中getAdd方法
getAdd (el) {
    this.$nextTick(() => {  
    this.$refs.shopcart.drop(el);
    });
}
```

### 9.插槽<slot>使用方法详解
说明：本项目中在headTop组件中使用具名插槽<slot>,作用是可以将不同的内容放入到已有的头部组件中。具体例子如下：
```
// 下面是headtop.vue文件中模板内容，下面有三个具名插槽，具体讲一下name="city"的插槽。
<template>
    <header class='headTop'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <span class="headGoback" v-if="goBack" @click="$router.go(-1)">
            <i class="icon-previewleft"></i>
        </span>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="headLogin">
            <span class="userAvatar" v-if="userInfo">
                <i class="icon-denglu-copy"></i>
            </span>
            <span class="loginSpan" v-else>登录|注册</span>
        </router-link>
        <section class="titleHead ellipsis" v-if="headTitle">
            <span class="titleText">{{headTitle}}</span>
        </section>
        <slot name="city"></slot>
    </header>
</template>
```
在home.vue中的使用如下：
```
// 使用了headtop组件，同时将slot="city"的<router-link>组件插入到headtop组件的<slot name="city"></slot>位置，简单来说<slot>相当于一个占位标识一样。
<template>
    <div>
        <head-top>
            <router-link slot="city" to="/citySelect">{{cityName}}</router-link>
        </head-top>
    </div>
</template>
```
