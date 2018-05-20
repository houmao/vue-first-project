<template>
    <div class="footGuide">
        <section @click = "gotoAddress({path: '/main', query: {geohash}})" class="guide_item" :class="$route.path.indexOf('main') !== -1 ? 'active' : ''">
            <i class="icon-takeaway icon"></i>
            <span>外卖</span>
        </section>
        <section @click = "gotoAddress({path: '/find'})" class="guide_item" :class="$route.path.indexOf('find') !== -1 ? 'active' : ''">
            <i class="icon-find icon"></i>
            <span>发现</span>
        </section>
        <section @click = "gotoAddress('/order')" class="guide_item" :class="$route.path.indexOf('order') !== -1 ? 'active' : ''">
            <i class="icon-orders icon"></i>
            <span>订单</span>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item" :class="$route.path.indexOf('profile') !== -1 ? 'active' : ''">
            <i class="icon-mine icon"></i>
            <span>我的</span>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {

            }
        },
        created () {

        },
        mounted () {

        },
        computed: {
            ...mapState([
                'geohash'
            ])
        },
        methods: {
            gotoAddress (path) {
                this.$router.push(path)
            }
        }

    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .footGuide {
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 1.95rem;
        display: flex;
        box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
        .guide_item {
            flex: 1;
            text-align: center;
            flex-direction: column;
            display: flex;
            align-items: center;
            &.active {
                .icon, span {
                    color: #119FFF;
                }
            }
            .icon {
                font-size: 0.9rem;
                margin-top: .3rem;
                color: #666;
            }
            span {
                font-size: 0.6rem;
                color: #666;
            }
        }
    }
</style>
