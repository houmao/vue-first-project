<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{active: selectType ===2 }" @click="select(2)">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{active: selectType ===0 }" @click="select(0)">
                {{desc.positive}}
                <span class="count">{{positive.length}}</span>
            </span>
            <span class="block negative" :class="{active: selectType ===1 }" @click="select(1)">
                {{desc.negative}}
                <span class="count">{{negative.length}}</span>
            </span>
        </div>
        <div @click="toggleContent" class="switch">
            <span class="icon-check_circle" :class="{on: onlyContent}"></span>
            <span class="text">只看内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        name: 'ratingselect',
        props: {
            ratings: {
                type: Array,
                default () {
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        methods: {
            select (type) {
                this.$emit('ratingtype', type)
            },
            toggleContent () {
                this.$emit('ratingtype', -1)
            }
        },
        computed: {
            positive () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                })
            },
            negative () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .ratingselect {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            .border-1px(rgba(7, 17, 27, 0.1));
            font-size: 0;
            .block {
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                color: rgb(77, 85, 93);
                font-size: 12px;
                &.active {
                    color: #ffffff;
                }
                .count {
                    font-size: 8px;
                    margin-left: 2px;
                }
                &.positive {
                    background-color: rgba(0, 160, 220, 0.2);
                    &.active {
                        background-color: rgb(0, 160, 220);
                    }
                }
                &.negative {
                    background-color: rgba(77, 85, 93, 0.2);
                    &.active {
                        background-color: rgb(77, 85, 93);
                    }
                }
            }
        }
        .switch {
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153,159);
            font-size: 0;
            .icon-check_circle {
                display: inline-block;
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
                &.on {
                    color: #00c850;
                }
            }
            .text {
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
</style>
