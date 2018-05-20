<template>
    <div class="home">
        <head-top>
            <div slot="city" class="cityName">
                <router-link class="title" :to="'/city/' + id">
                    <i class="icon-position"></i>
                    <span>{{cityName}}</span>
                    <i class="icon-drop-down"></i>
                </router-link>
            </div>
        </head-top>
        <div class="searchWrapper">
            <div class="search">
                <router-link class="content" to="/search">
                    <i class="icon-search"></i>
                    <span>搜索商家、商品名称</span>
                </router-link>
            </div>
        </div>
        <!--<nav class="msite_nav1">-->
            <!--<div class="swiper-container1" v-if="foodTypes.length">-->
                <!--<div class="swiper-wrapper1">-->
                    <!--<div class="swiper-slide food_types_container">-->
                        <!--<img :src="imgBaseUrl + '/5/78/ea6efe857599f67bcec5d671f56b2jpeg.jpeg?imageMogr/format/webp/'" alt="">-->
                    <!--</div>-->
                    <!--<div class="swiper-slide food_types_container">-->
                        <!--<img :src="imgBaseUrl + '/0/e7/64044fb6df771e9cb42196ae3eeeejpeg.jpeg?imageMogr/format/webp/'" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="swiper-pagination1"></div>-->
            <!--</div>-->
        <!--</nav>-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
                        <router-link :to="{path: '/foodtype', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                            <figure>
                                <img :src="imgBaseUrl + foodItem.image_url">
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <div class="shop_list_container">
            <header class="shop_header">
                <i class="icon-mall shop_icon"></i>
                <span class="shop_header_title">附近商家</span>
            </header>
            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import { mapMutations, mapState } from 'vuex'
    import headTop from 'components/common/headtop/headtop'
    import footGuide from 'components/common/footer/footGuide'
    import shopList from 'components/common/shoplist'
    import { msiteAddress, cityGuess, msiteFoodTypes } from 'src/service/getData'
    export default {
        data () {
            return {
                id: '',
                cityName: '', // home页面头部标题
                geohash: '', // city页面传递过来的地址geohash
                foodTypes: [], // 食品分类列表
                hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
                imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
            }
        },
        async beforeMount () {
            if (!this.$route.query.geohash) {
                const address = await cityGuess();
                this.geohash = address.latitude + ',' + address.longitude;
                this.id = address.id;
            } else {
                this.geohash = this.$route.query.geohash;
                this.id = this.cityid || 1;
            }
            // 保存geohash 到vuex
            this.SAVE_GEOHASH(this.geohash);
            // 获取位置信息
            let res = await msiteAddress(this.geohash);
            this.cityName = res.name;
            // 记录当前经度纬度
            this.RECORD_ADDRESS(res);
            this.hasGetData = true;
        },
        mounted () {
            // 获取导航食品类型列表
            msiteFoodTypes(this.geohash).then(res => {
                let resLength = res.length;
                let resArr = [...res]; // 返回一个新的数组
                let foodArr = [];
                for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                    foodArr[j] = resArr.splice(0, 8);
                }
                this.foodTypes = foodArr;
            }).then(() => {
                // 初始化swiper
                /* eslint-disable no-new */
                new Swiper('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop: true
                });
            })
        },
        computed: {
            ...mapState(['cityId'])
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS', 'SAVE_GEOHASH', 'RECORD_CITYID'
            ]),
            getCategoryId (url) {
                let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
                if (/restaurant_category_id/gi.test(urlData)) {
                    return JSON.parse(urlData).restaurant_category_id.id
                } else {
                    return ''
                }
            }
        },
        components: {
            headTop,
            footGuide,
            shopList
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .home {
        .cityName {
            display: flex;
            width: 70%;
            font-weight: 700;
            padding: 0.6rem 0.5rem;
            .title {
                margin: 0 1.333333vw;
                font-size: 0.75rem;
                color: #ffffff;
                width: 100%;
                span {
                    display: inline-block;
                    width: 78%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .icon-drop-down {
                    font-size: 0.5rem;
                }
            }
        }
        .searchWrapper {
            position: sticky;
            top: 0px;
            z-index: 999;
            background-image: linear-gradient(90deg, #0af, #0085ff);
            .search {
                top: 0px;
                z-index: 999;
                padding: 0.3rem 0.5rem;
                margin: -.013333rem 0;
                .content {
                    display: flex;
                    width: 100%;
                    height: 9.6vw;
                    -webkit-justify-content: center;
                    justify-content: center;
                    align-items: center;
                    border-radius: .266667vw;
                    background: #fff;
                    color: #999;
                    font-size: 0.6rem;
                }
            }
        }
        .msite_nav{
            background-color: #fff;
            border-bottom: 0.025rem solid @bc;
            .swiper-container{
                .wh(100%, auto);
                padding-bottom: 0.6rem;
                .swiper-pagination{
                    bottom: 0.2rem;
                }
                .food_types_container{
                    display:flex;
                    flex-wrap: wrap;
                    .link_to_food{
                        width: 25%;
                        padding: 0.3rem 0;
                        .fj(center);
                        figure{
                            img{
                                margin-bottom: 0.3rem;
                                .wh(1.8rem, 1.8rem);
                            }
                            figcaption{
                                text-align: center;
                                .sc(0.55rem, #666);
                            }
                        }
                    }
                }
            }
            .fl_back{
                .wh(100%, 100%);
            }
        }
        .shop_list_container {
            margin-top: .4rem;
            border-top: 0.025rem solid @bc;
            background-color: #fff;
            .shop_header {
                .shop_icon {
                    color: #999;
                    margin-left: 0.6rem;
                    font-size: 0.65rem;
                }
                .shop_header_title {
                    color: #999;
                    .font(0.55rem, 1.6rem);
                }
            }
        }
    }
</style>
