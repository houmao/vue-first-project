<template>
    <div class="header">
        <div class="background">
            <img :src="seller.bgm" width="100%" height="100%">
            <span class="back" @click="$router.push('/main')">
                <i class="icon-arrow_lift"></i>
            </span>
        </div>
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="商家">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support" @click="showDetail">
                    <start :index="seller.supports[0].type"></start>
                    <span class="text">{{seller.supports[0].description}}</span>
                    <div class="support-count" v-if="seller.supports">
                        <span class="count">{{seller.supports.length}}个</span>
                        <i class="icon-keyboard_arrow_right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports"  :key="index">
                                <start :index="seller.supports[index].type"></start>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import star from 'components/common/star'
    import start from 'components/common/start'
    export default {
        name: 'v-header',
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                detailShow: false
            }
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            hideDetail () {
                this.detailShow = false;
            }
        },
        components: {
            star,
            start
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .header {
        position: relative;
        overflow: hidden;
        .content-wrapper {
            position: relative;
            padding: 24px 12px 0;
            font-size: 0;
            .avatar {
                display: inline-block;
                vertical-align: top;
                img {
                    border-radius: 2px;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-top: -40px;
                    margin-left: -32px;
                }
            }
            .content {
                text-align: center;
                .title {
                    margin: 2px 0 8px 0;
                    .brand {
                        width: 30px;
                        height: 18px;
                        display: inline-block;
                        vertical-align: top;
                        .bg-image('brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }
                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .support {
                    margin: 5px 0;
                    .text {
                        font-size: 10px;
                        line-height: 12px;
                    }
                }
            }
            .support-count {
                position: absolute;
                right: 12px;
                bottom: 0;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                background: #F3F5F7;
                text-align: center;
                .count {
                    vertical-align: top;
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right {
                    line-height: 24px;
                    margin-left: 2px;
                    font-size: 10px;
                }
            }
        }
        .bulletin-wrapper {
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: #F3F5F7;
            .bulletin-title {
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                .bg-image('bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-text {
                vertical-align: top;
                margin: 0 4px;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }
        .background {
            height: 3.8rem;
            .back {
                position: absolute;
                top: 10px;
                left: 0;
                .icon-arrow_lift {
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #ffffff;
                    cursor: pointer;
                }
            }
        }
        .detail {
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);/* 给ios系统显示设置模糊样式*/
            &.fade-enter-active, &.fade-leave-active {
                transition: opacity .5s;
            }
            &.fade-enter, &.fade-leave-to {
                opacity: 0;
            }
            .detail-wrapper {
                min-height: 100%;
                width: 100%;
                .detail-main {
                    /*margin-top: 64px;*/
                    width: 80%;
                    margin: 64px auto 0 auto;
                    padding-bottom: 64px;
                    .name {
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .star-wrapper {
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }
                    .title {
                        display: flex;
                        /*width: 80%;*/
                        margin: 28px auto 24px auto;
                        .line {
                            flex: 1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(225, 225, 225, 0.2);
                        }
                        .text {
                            padding: 0 12px;
                            font-weight: 700;
                            font-size: 14px;
                        }
                    }
                    .supports {
                        /*margin: 0 auto;*/
                        .support-item {
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .icon {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-size: 16px 16px;
                                background-repeat: no-repeat;
                                &.decrease {
                                    .bg-image('decrease_1');
                                }
                                &.discount {
                                    .bg-image('discount_1');
                                }
                                &.guarantee {
                                    .bg-image('guarantee_1');
                                }
                                &.invoice {
                                    .bg-image('invoice_1');
                                }
                                &.special {
                                    .bg-image('special_1');
                                }
                            }
                            .text {
                                font-size: 12px;
                                line-height: 16px;
                            }
                        }
                    }
                    .bulletin {
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto 0 auto;
                font-size: 32px;
            }
        }
    }
</style>
