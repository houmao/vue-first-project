<template>
    <div class="cityContainer">
        <head-top :head-title="cityname || guessCity">
            <span slot="goback" class="goBack" @click="$router.push({path:'/main'})">
                <i class="icon-previewleft"></i>
            </span>
        </head-top>
        <nav class="cityNav">
            <div class="cityChange">
                <span v-if="guessCity">默认城市为：</span>
                <span v-if="cityname">当前定位城市为：</span>
                <router-link to="/citySelect" class="guessCity">
                    <span>{{cityname || guessCity}}</span>
                    <i class="icon-previewright arrow_right"></i>
                </router-link>
            </div>
        </nav>
        <form class="cityForm" @submit.prevent>
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="cityInput inputStyle" required v-model='inputVaule'>
            </div>
            <div>
                <input type="submit" name="submit" class="citySubmit inputStyle" @click='postpois' value="提交">
            </div>
        </form>
        <header v-if="historytitle" class="poisSearchHistory">搜索历史</header>
        <ul class="getpoisUl">
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="poisName ellipsis">{{item.name}}</h4>
                <p class="poisAddress ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <footer v-if="historytitle&&placelist.length" class="clearAllHistory" @click="clearAll">清空所有</footer>
        <div class="searchNonePlace" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import headTop from 'components/common/headtop/headtop'
    import {currentcity, searchplace, cityGuess} from 'src/service/getData'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'

    export default {
        data () {
            return {
                guessCity: '', // 当前城市
                inputVaule: '', // 搜索地址
                cityid: null, // 当前城市id
                cityname: '', // 当前城市名字
                placelist: [], // 搜索城市列表
                placeHistory: [], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false// 搜索无结果，显示提示信息
            }
        },

        mounted () {
            this.cityid = this.$route.params.cityid;
//            // 获取当前城市名字
            if (this.cityid) {
                currentcity(this.cityid).then(res => {
                    this.cityname = res.name;
                })
            } else {
                cityGuess().then(res => {
                    this.guessCity = res.name;
                    this.cityid = res.id;
                })
            }
            this.RECORD_CITYID(this.cityid);
            this.initData();
        },

        components: {
            headTop
        },

        computed: {},
        methods: {
            ...mapMutations(['RECORD_CITYID']),
            initData () {
                // 获取搜索历史记录
                if (getStore('placeHistory')) {
                    this.placelist = JSON.parse(getStore('placeHistory'));
                } else {
                    this.placelist = [];
                }
            },
            // 发送搜索信息inputVaule
            postpois () {
                // 输入值不为空时才发送信息
                if (this.inputVaule && this.cityid) {
                    searchplace(this.cityid, this.inputVaule).then(res => {
                        this.historytitle = false;
                    this.placelist = res;
                    this.placeNone = !res.length;
                });
                }
            },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage (index, geohash) {
                let history = getStore('placeHistory');
                let choosePlace = this.placelist[index];
                if (history) {
                    let checkrepeat = false;
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(item => {
                        if (item.geohash === geohash) {
                        checkrepeat = true;
                    }
                })
                    if (!checkrepeat) {
                        this.placeHistory.push(choosePlace)
                    }
                } else {
                    this.placeHistory.push(choosePlace)
                }
                setStore('placeHistory', this.placeHistory);
                this.$router.push({path: '/main', query: {geohash}})
            },
            clearAll () {
                removeStore('placeHistory');
                this.initData();
            }
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .cityContainer {
        .goBack {
            .icon-previewleft {
                display: block;
                padding: 10px;
                font-size: 25px;
                color: #ffffff;
            }
        }
        .cityNav {
            background-color: #fff;
            .cityChange {
                width: 90%;
                margin: 0 auto;
                font-size: 0.65rem;
            }
            .guessCity {
                .font(0.75rem, 1.8rem);
                span {
                    color: @blue;
                }
                .arrow_right {
                    .wh(.6rem, .6rem);
                    color: @blue;
                }
            }
        }
        .cityForm {
            background-color: #fff;
            padding-top: 0.4rem;
            div {
                width: 90%;
                margin: 0 auto;
                text-align: center;
                .cityNone {
                    font-size: 0.65rem;
                    text-align: left;
                    margin: 0;
                }
                .inputStyle {
                    border-radius: 0.1rem;
                    margin-bottom: 0.4rem;
                    .wh(100%, 1.4rem);
                }
                .cityInput {
                    border: 1px solid @bc;
                    padding: 0 0.3rem;
                    .sc(0.65rem, #333);
                }
                .citySubmit {
                    background-color: @blue;
                    .sc(0.65rem, #fff);
                }
            }
        }

        .poisSearchHistory {
            border-top: 1px solid @bc;
            border-bottom: 1px solid @bc;
            padding-left: 0.5rem;
            .font(0.475rem, 0.8rem);
        }

        .getpoisUl {
            background-color: #fff;
            li {
                margin: 0 auto;
                padding-top: 0.65rem;
                border-bottom: 1px solid @bc;
                .poisName {
                    margin: 0 auto 0.35rem;
                    width: 90%;
                    .sc(0.65rem, #333);
                }
                .poisAddress {
                    width: 90%;
                    margin: 0 auto 0.55rem;
                    .sc(0.45rem, #999);
                }
            }
        }

        .searchNonePlace {
            margin: 0 auto;
            .font(0.65rem, 1.75rem);
            color: #333;
            background-color: #fff;
            text-indent: 0.5rem;
        }

        .clearAllHistory {
            .sc(0.7rem, #666);
            text-align: center;
            line-height: 2rem;
            background-color: #fff;
        }
    }
</style>
