 <template>
    <div class="order_page">
        <head-top head-title="订单列表" go-back='true'></head-top>
        <ul class="order_list_ul" v-load-more="loaderMore" v-if="orderList">
            <li class="order_list_li" v-for="item in orderList" :key="item.id">
                <img :src="imgBaseUrl + item.restaurant_image_url" class="restaurant_image">
                <section class="order_item_right">
                    <section @click="showDetail(item)">
                        <header class="order_item_right_header">
                            <section class="order_header">
                                <h4 >
                                    <span class="ellipsis">{{item.restaurant_name}} </span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4>
                                <p class="order_time">{{item.formatted_created_at}}</p>
                            </section>
                            <p class="order_status">
                                {{item.status_bar.title}}
                            </p>
                        </header>
                        <section class="order_basket">
                            <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
                            <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
                        </section>
                    </section>
                    <div class="order_again">
                        <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"></compute-time>
                        <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link>
                    </div>
                </section>
            </li>
        </ul>
        <section class="noneData" else="!orderList">
            <img src="../../assets/none_data.png" alt="暂无数据">
            <h3>登录后查看订单</h3>
            <router-link to="/login">
                <button>立即登录</button>
            </router-link>
        </section>
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'components/common/headtop/headtop'
    import computeTime from 'components/common/computeTime'
    import loading from 'components/common/loading'
    import footGuide from 'components/common/footer/footGuide'
    import {getOrderList} from 'src/service/getData'
    import {loadMore} from 'components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'

    export default {
      data () {
            return {
                orderList: null, // 订单列表
                offset: 0,
                preventRepeat: false, // 防止重复获取
                showLoading: true, // 显示加载动画
                imgBaseUrl
            }
        },
        mounted () {
            this.initData();
        },
        mixins: [loadMore],
        components: {
            headTop,
            footGuide,
            loading,
            computeTime
        },
        computed: {
            ...mapState([
                'userInfo', 'geohash'
            ])
        },
        methods: {
             ...mapMutations([
               'SAVE_ORDER'
            ]),
            // 初始化获取信息
            async initData () {
                if (this.userInfo && this.userInfo.user_id) {
                    let res = await getOrderList(this.userInfo.user_id, this.offset);
                    this.orderList = [...res];
                    this.hideLoading();
                } else {
                    this.hideLoading();
                }
            },
            // 加载更多
            async loaderMore () {
                if (this.preventRepeat) {
                    return
                }
                this.preventRepeat = true;
                this.showLoading = true;
                this.offset += 10;
                // 获取信息
                let res = await getOrderList(this.userInfo.user_id, this.offset);
                this.orderList = [...this.orderList, ...res];
                this.hideLoading();
                if (res.length < 10) {
                    return
                }
                this.preventRepeat = false;
            },
            // 显示详情页
            showDetail (item) {
                this.SAVE_ORDER(item);
                this.preventRepeat = false;
                this.$router.push('/order/orderDetail');
            },
            // 生产环境与发布环境隐藏loading方式不同
            hideLoading () {
                this.showLoading = false;
            }
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id && !this.orderList) {
                    this.initData();
                }
            }
        }
    }
</script>

 <style lang="less" rel="stylesheet/less" scoped>
     @import "../../common/style/mixin.less";

    .order_page{
        background-color: #f1f1f1;
        margin-bottom: 1.95rem;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .order_list_ul{
            padding-top: 1.95rem;
            .order_list_li{
                background-color: #fff;
                display: flex;
                margin-bottom: 0.5rem;
                padding: .6rem .6rem 0;
                .restaurant_image{
                    .wh(2rem, 2rem);
                    margin-right: 0.4rem;
                }
                .order_item_right{
                    flex: 5;
                    .order_item_right_header{
                        border-bottom: 0.025rem solid #f5f5f5;
                        padding-bottom: .3rem;
                        .fj;
                        .order_header{
                            h4{
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                .sc(.75rem, #333);
                                line-height: 1rem;
                                width: 9rem;

                                .arrow_right{
                                    .wh(.4rem, .4rem);
                                    fill: #ccc;
                                    margin-right: .2rem;
                                }
                            }
                            .order_time{
                                .sc(.55rem, #999);
                                line-height: .8rem;
                            }
                        }
                        .order_status{
                            .sc(.6rem, #333);
                        }
                    }
                    .order_basket{
                        .fj;
                        line-height: 2rem;
                        border-bottom: 0.025rem solid #f5f5f5;
                        .order_name{
                            .sc(.6rem, #666);
                            width: 10rem;
                        }
                        .order_amount{
                            .sc(.6rem, #f60);
                            font-weight: bold;
                        }
                    }
                    .order_again{
                        text-align: right;
                        line-height: 1.6rem;
                        .buy_again{
                            .sc(.55rem, #3190e8);
                            border: 0.025rem solid #3190e8;
                            padding: .1rem .2rem;
                            border-radius: .15rem;
                        }
                    }
                }
            }
        }
        .noneData {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 26.666667vw;
            img {
                display: block;
                width: 53.333333vw;
            }
            h3 {
                margin: 3.333333vw 0 2.666667vw;
                color: #6a6a6a;
                font-weight: 400;
                font-size: .653333rem;
            }
            button {
                padding: 2.666667vw;
                min-width: 32vw;
                border: none;
                border-radius: 1.533333vw;
                background-color: #56d176;
                color: #fff;
                text-align: center;
                font-size: .653333rem;
                font-family: inherit;
            }
        }
        .loading-enter-active, .loading-leave-active {
            transition: opacity .7s
        }
        .loading-enter, .loading-leave-active {
            opacity: 0
        }
        .router-slid-enter-active, .router-slid-leave-active {
            transition: all .4s;
        }
        .router-slid-enter, .router-slid-leave-active {
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }
    }
</style>
