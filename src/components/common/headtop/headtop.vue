<template>
    <header class='headTop'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <span class="headGoback" v-if="goBack" @click="$router.go(-1)">
            <i class="icon-previewleft"></i>
        </span>
        <slot name="goback"></slot>
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
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        mounted () {
            // 获取用户信息
            this.getUserInfo();
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ])
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../../common/style/index.less";
    .headTop {
        background-image: linear-gradient(90deg,#0af,#0085ff);
        position: relative;
        z-index: 200;
        .wh(100%, 1.95rem);
        .headGoback {
            display: inline-block;
        }
        .headLogin {
            right: 0.55rem;
            .sc(0.65rem, #fff);
            .ct;
            .loginSpan {
                color: #fff;
            }
            .userAvatar {
                display: inline-block;
            }
        }
        .icon-previewleft, .icon-denglu-copy {
            display: block;
            padding: 10px;
            font-size: 25px;
            color: #ffffff;
        }
        .titleHead {
            .center;
            width: 50%;
            color: #fff;
            text-align: center;
            .titleText {
            .sc(0.8rem, #fff);
                text-align: center;
            }
        }
    }
</style>
