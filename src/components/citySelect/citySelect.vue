<template>
    <div class="homePage">
        <head-top signin-up='home' go-back='true' :head-title="headTitle" goBack="true"></head-top>
        <section class="hotCityContainer">
            <h4 class="cityTitle">热门城市</h4>
            <ul class="cityListUl clear">
                <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letterClassifyLi">
                    <h4 class="cityTitle" :id="key">{{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcityNameContainer cityListUl clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id"
                                     class="ellipsis">
                            {{item.name}}

                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
        <aside class="letter-aside">
            <ul>
                <li v-for="(value, key) in sortgroupcity" :key="key"  @click="naver(key)">
                    {{key}}
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
    import headTop from 'components/common/headtop/headtop'
    import {cityGuess, hotcity, groupcity} from '../../service/getData'

    export default {
        data () {
            return {
                headTitle: '选择城市',
                guessCity: '', // 当前城市
                guessCityid: '', // 当前城市id
                hotcity: [], // 热门城市列表
                groupcity: {} // 所有城市列表
            }
        },

        mounted () {
            //  获取当前城市
            cityGuess().then(res => {
                this.guessCity = res.name;
                this.guessCityid = res.id;
            })

            // 获取热门城市
            hotcity().then(res => {
                this.hotcity = res;
            })

            // 获取所有城市
            groupcity().then(res => {
                this.groupcity = res;
            })
        },

        components: {
            headTop
        },

        computed: {
            // 将获取的数据按照A-Z字母开头排序
            sortgroupcity () {
                let sortobj = {};
                for (let i = 65; i <= 90; i++) {
                    if (this.groupcity[String.fromCharCode(i)]) {
                        sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                    }
                }
                return sortobj
            }
        },

        methods: {
            // 点击图标刷新页面
            reload () {
                window.location.reload();
            },
            naver (id) { // 点击右边字母滚动
                let obj = document.getElementById(id);
                let oPos = obj.offsetTop;
                const str = document.documentElement.style.fontSize;
                let top = str.substr(0, str.length - 2);
                return window.scrollTo(0, oPos - top * 1.95);
            }
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .homePage {
        .headLogo {
            left: 0.4rem;
            font-weight: 400;
            .sc(0.7rem, #fff);
            .wh(2.3rem, 0.7rem);
            .ct;
        }
        .icon-home {
            left: 0.4rem;
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #ffffff;
        }
        .hotCityContainer {
            background-color: #fff;
            margin-bottom: 0.4rem;
        }
        .cityListUl {
            li {
                float: left;
                text-align: center;
                color: @blue;
                border-bottom: 0.025rem solid @bc;
                border-right: 0.025rem solid @bc;
                .wh(25%, 1.75rem);
                .font(0.6rem, 1.75rem);
            }
            li:nth-of-type(4n) {
                border-right: none;
            }
        }
        .cityTitle {
            color: #666;
            font-weight: 400;
            text-indent: 0.45rem;
            border-bottom: 1px solid @bc;
            .font(0.55rem, 1.45rem, "Helvetica Neue");
            span {
                .sc(0.475rem, #999);
            }
        }

        .letterClassifyLi {
            margin-bottom: 0.4rem;
            background-color: #fff;
            border-bottom: 1px solid @bc;
            .groupcityNameContainer {
                li {
                    color: #666;
                }
            }
        }
        .letter-aside {
            position: fixed;
            right: 10px;
            top: 2.3rem;
            ul {
                list-style: none;
                line-height: 1.6em;
                font-size: 0.6rem;
                color: #3190E8;
                cursor: pointer;
            }
        }
    }
</style>
