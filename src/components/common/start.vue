<template>
    <span class="icon" :class="classMap[index]"></span>
</template>

<script>
    export default {
        props: {
            index: {
                type: Number
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../common/style/mixin.less";
    .icon {
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        &.decrease {
            .bg-image('decrease_4');
        }
        &.discount {
            .bg-image('discount_4');
        }
        &.guarantee {
            .bg-image('guarantee_4');
        }
        &.invoice {
            .bg-image('invoice_4');
        }
        &.special {
            .bg-image('special_4');
        }
    }
</style>
