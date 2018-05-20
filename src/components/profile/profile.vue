<template>
    <div class="profile_page">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
                    <span class="privateImage" v-else>
                        <i class="icon-denglu-copy privateImage-svg"></i>
                    </span>
                    <div class="user-info">
                        <p>{{username}}</p>
                        <p>
                            <span class="user-icon">
                                <i class="icon-phone icon-mobile"></i>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <i class="icon-previewright arrow-svg"></i>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">钱包</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{count}}</b>个</span>
                        <span class="info-data-bottom">红包</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{pointNumber}}</b>个</span>
                        <span class="info-data-bottom">金币</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的地址 -->
                <router-link to='/order' class="myorder">
                    <img src="../../assets/mine/position.png" alt="我的地址">
                    <div class="myorder-div">
                        <span>我的地址</span>
                        <span class="myorder-divsvg">
                            <i class="icon-previewright"></i>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 积分商城 -->
                <a href='https://home.m.duiba.com.cn/chome/index' class="myorder">
                    <img src="../../assets/mine/mall.png" alt="金币商城">
                    <div class="myorder-div">
                        <span>金币商城</span>
                        <span class="myorder-divsvg">
                            <i class="icon-previewright"></i>
                        </span>
                    </div>
                </a>
                <!-- 饿了么会员卡 -->
                <router-link to='/vipcard' class="myorder">
                    <img src="../../assets/mine/share.png" alt="分享领5元现金">
                    <div class="myorder-div">
                        <span>分享领5元现金</span>
                        <span class="myorder-divsvg">
                            <i class="icon-previewright"></i>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='/service' class="myorder">
                    <img src="../../assets/mine/customer.png" alt="我的客服">
                    <div class="myorder-div">
                        <span>我的客服</span>
                        <span class="myorder-divsvg">
                            <i class="icon-previewright"></i>
                        </span>
                    </div>
                </router-link>
                <!-- 下载饿了么APP -->
                <router-link to='/download' class="myorder">
                    <img src="../../assets/mine/download.png" alt="下载客户端">
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>下载客户端</span>
                        <span class="myorder-divsvg">
                            <i class="icon-previewright"></i>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'components/common/headtop/headtop'
import footGuide from 'components/common/footer/footGuide'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {getImgPath} from 'components/common/mixin'

export default {
    data () {
        return {
            profiletitle: '我的',
            username: '登录/注册', // 用户名
            resetname: '',
            mobile: '暂无绑定手机号', // 电话号码
            balance: 0, // 我的余额
            count: 0, // 优惠券个数
            pointNumber: 0, // 积分数
            avatar: '', // 头像地址
            imgBaseUrl
        }
    },
    mounted () {
        this.initData();
    },
    mixins: [getImgPath],
    components: {
        headTop,
        footGuide
    },
    computed: {
        ...mapState([
            'userInfo'
        ]),
        // 后台会返回两种头像地址格式，分别处理
        imgpath: function () {
            let path;
            if (this.avatar.indexOf('/') !== -1) {
                path = imgBaseUrl + this.avatar;
            } else {
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },

    methods: {
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        initData () {
            if (this.userInfo && this.userInfo.user_id) {
                this.avatar = this.userInfo.avatar;
                this.username = this.userInfo.username;
                this.mobile = this.userInfo.mobile || '暂无绑定手机号';
                this.balance = this.userInfo.balance;
                this.count = this.userInfo.gift_amount;
                this.pointNumber = this.userInfo.point;
            } else {
                this.username = '登录/注册';
                this.mobile = '暂无绑定手机号';
            }
        }
    },
    watch: {
        userInfo: function (value) {
            this.initData()
        }
    }
}

</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../common/style/mixin.less";

    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
   .profile-number{
        .profile-link{
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background-image: linear-gradient(90deg,#0af,#0085ff);
            padding: 6.666667vw 4vw;
            margin: -0.013333rem 0;
            .privateImage{
                display:inline-block;
                .wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    border-radius:50%;
                    .wh(2.5rem,2.5rem);
                    background: #C4E7F5;
                    display: inline-block;
                    font-size: 2.4rem;
                    text-align: center;
                    color: #fff;
                }
            }
            .user-info{
                margin-left:.48rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    .sc(.8rem,@fc);
                    .user-icon{
                        .wh(0.5rem,0.75rem);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem;
                        .icon-mobile{
                            .wh(100%,100%);
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        .sc(.57333rem,@fc);
                    }
                }

            }
            .arrow{
                .wh(.46667rem,.98rem);
                display:inline-block;
                color: #ffffff;
            }
        }
   }
   .info-data{
        width:100%;
        background:@fc;
        box-sizing: border-box;
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    .sc(.55rem,#333);
                    padding: 0.853333rem 0 0.6rem;
                    b{
                        display:inline-block;
                        .sc(1.2rem,#f90);
                        font-weight:700;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    .sc(.57333rem,#666);
                    font-weight:400;
                    padding-bottom:.453333rem;

                }
            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(3){
                border:0;
                .info-data-top{
                    b{
                        color:#6ac20b;
                    }
                }
            }
        }
   }
   .profile-1reTe{
        margin-top:.4rem;
        background:@fc;
        .myorder{
            padding-left:1.6rem;
            display:flex;
            align-items: center;
            img{
                .wh(.7rem,.7rem);
                margin-left:-.866667rem;
                margin-right:.266667rem;
            }
            .myorder-div{
                width:100%;
                border-bottom:1px solid #f1f1f1;
                padding:.433333rem .266667rem .433333rem 0;
                .sc(.7rem,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                }
                .myorder-divsvg{
                    .wh(.46667rem,.466667rem);
                }
            }
        }
        .myorder:nth-of-type(3) .myorder-div{
            border:0;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
