import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import goods from '@/components/shop/children/goods'
import ratings from '@/components/shop/children/ratings'
import seller from '@/components/shop/children/seller'
import citySelect from '@/components/citySelect/citySelect'
import login from '@/components/login/login'
import city from '@/components/city/city'
import shop from '@/components/shop/shop'
import search from '@/components/search/search'
import foodtype from '@/components/foodtype/foodtype'
import find from '@/components/find/find'
import order from '@/components/order/order'
import profile from '@/components/profile/profile'
import info from '@/components/profile/children/info'
import setusername from '@/components/profile/children/children/setusername'
import address from '@/components/profile/children/children/address'
import add from '@/components/profile/children/children/children/add'
import addDetail from '@/components/profile/children/children/children/children/addDetail'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', redirect: 'main'},
        {
            path: '/main',
            name: home,
            component: home
        },
        {
            path: '/citySelect',
            name: 'citySelect',
            component: citySelect
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: login
        },
        // 当前选择城市页
        {
            path: '/city/:cityid',
            name: 'city',
            component: city
        },
        // 搜索页
        {
            path: '/search',
            component: search
        },
        // 搜索页
        {
            path: '/foodtype',
            component: foodtype
        },
        // 发现
        {
            path: '/find',
            component: find
        },
        // 订单页
        {
            path: '/order',
            component: order
        },
        // 订单页
        {
            path: '/profile',
            component: profile
        },
        // 商品详情页
        {
            path: '/shop',
            name: 'shop',
            component: shop,
            redirect: '/shop/goods',
            children: [{
                path: 'goods',
                name: 'goods',
                component: goods
            }, {
                path: 'ratings',
                name: 'ratings',
                component: ratings
            }, {
                path: 'seller',
                name: 'seller',
                component: seller
            }]
        },
        // 个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', // 个人信息详情页
                component: info,
                children: [{
                    path: 'setusername',
                    component: setusername
                }, {
                    path: 'address',
                    component: address, // 编辑地址
                    children: [{
                        path: 'add',
                        component: add,
                        children: [{
                            path: 'addDetail',
                            component: addDetail
                        }]
                    }]
                }]
            }]
        }
    ],
    linkActiveClass: 'active'
})
