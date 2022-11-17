<template>
    <div>
        <div id="select">
            <div style="position: relative;width: 100%;height: 4rem;">
                <h2 style="width:80%;position: absolute;font-weight: 400;font-family:'微软雅黑'">后台管理系统</h2>
                <el-button type="info" style="position: absolute;right: 2rem;top: 1rem;" @click="exit()">退出</el-button>
            </div>
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                style="display:flex;justify-content:space-between;margin-top: 2rem;">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">课程建设</el-menu-item>
                <el-menu-item index="3">学术交流</el-menu-item>
                <el-menu-item index="4">团队风采</el-menu-item>
                <el-menu-item index="5">语料库</el-menu-item>
            </el-menu>
        </div>

        <div id="main" v-show="active == 1">
            <lbt :part="active" :id="1"></lbt>

        </div>
        <div id="course" v-show="active == 2">
            <lbt :part="active" :id="2"></lbt>
            <zjxx :part="active" :id="2"></zjxx>
        </div>
        <div id="course" v-show="active == 3">
            <lbt :part="active" :id="3"></lbt>
        </div>
        <div id="group" v-show="active == 4">
            <lbt :part="active" :id="4"></lbt>
        </div>
        <div id="group" v-show="active == 5">
            <lbt :part="active" :id="5"></lbt>
            <zjxx :part="active" :id="5"></zjxx>
        </div>
    </div>
</template>

<script>
import lbt from '@/view/MyLbt.vue'
import zjxx from '@/view/MyZjxx.vue'
export default {
    components: {
        lbt: lbt,
        zjxx: zjxx
    },
    data() {
        return {
            active: 1,
            MainSwiper: [],
        }
    },
    methods: {
        curs(row) {
            if (row.column.label === "图片地址")
                return "cursor:pointer;"
        },
        openpic(url) {
            window.open(url);
        },
        handleSelect(index) {
            this.active = index;

        },
        GetMainSwiper() {
            this.$axios.request({
                method: 'GET',
                url: "/api/home/main",
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.MainSwiper = res.data
                }
            })
        },
        MainSwiperDel(index, row) {
            // console.log(row.pid);
            this.$confirm('是否确认删除继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.MainSwiper.splice(index, 1)
                this.$axios.delete('/api/home/main', { 'data': { 'id': row.pid } });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                // 点的是取消，就弹出取消删除的提示框
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },
        MainSwiperAdd() {

        },
        exit() {
            window.localStorage.removeItem('token');
            this.$router.replace('/Login')
        }
    },
    watch: {
        active: {
            immediate: true,
            handler(newvalue) {
                if (newvalue == 1)
                    this.GetMainSwiper();
            }
        }
    }
}
</script>

<style scoped>
#select {
    width: 76.8rem;
    margin: auto;
}
</style>