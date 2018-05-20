<template>
    <div class="rating_page">
        <head-top head-title="发现" go-back='true'></head-top>
        <section class="noneData">
            <img src="../../assets/none_data.png" alt="暂无数据">
            <h3>暂无数据</h3>
        </section>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import {imgBaseUrl} from 'src/config/env'
    import headTop from 'components/common/headtop/headtop'
    import {getImgPath} from 'components/common/mixin'
    import footGuide from 'components/common/footer/footGuide'

    export default {
        data () {
            return {
                imgBaseUrl
            }
        },
        created () {

        },
        mixins: [getImgPath],
        components: {
            headTop,
            footGuide
        },
        props: [],
        methods: {}
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../common/style/mixin.less";
    .rating_page {
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
        }
    }

</style>
