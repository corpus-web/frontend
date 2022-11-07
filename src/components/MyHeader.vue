<template>
    <div style="background-color:white">
        <div class="header">
            <div @click="$router.push('/Mian')"
                style="width:345px;height:75px;cursor:pointer;position: absolute; top: 25px; left: 14px; cursor: pointer;">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 头部 */
.header {
    height: 6.86rem;
    /* background-color: white; */
    /* height: 9rem; */
    background: url(@/assets/images/logo4.png) no-repeat;

    /* background-size: 100% 100%; */
    position: relative;

}

/* .header img {
    position: absolute;
    top: 1.965rem;
    left: 11.52rem;
} */
</style>