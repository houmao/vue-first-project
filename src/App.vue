<template>
    <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
</template>

<script>

</script>

<style lang="less" rel="stylesheet/less">
    .first {
        &.router-fade-enter-active, &.router-fade-leave-active {
            transition: opacity .3s;
        }
        &.router-fade-enter, &.router-fade-leave-active {
            opacity: 0;
        }
    }
</style>
