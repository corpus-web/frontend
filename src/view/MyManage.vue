<template>
    <div class="big">
        <div id="select">
            <div style="position: relative;width: 100%;height: 4rem;">
                <h2 style="width:80%;position: absolute;font-family:'微软雅黑';font-size: 30px;margin-left:42%;">后台管理系统
                </h2>
                <div style="position:absolute;right: 0;top: 1.5rem;">
                    <el-button type="info" @click="change_pwd()">
                        修改密码
                    </el-button>
                    <el-button type="info" @click="exit()">退出
                    </el-button>
                </div>
            </div>
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                style="display:flex;justify-content:space-between;margin-top: 2rem;">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">课程建设</el-menu-item>
                <el-menu-item index="3">学术交流</el-menu-item>
                <el-menu-item index="4">团队风采</el-menu-item>
                <el-menu-item index="5">语料库</el-menu-item>
                <el-menu-item index="6">语料库文章</el-menu-item>
            </el-menu>
        </div>
        <el-dialog title="修改密码" :visible.sync="show_change_pwd" width="500px">
            <el-form :model="change_pass" label-width="70px" label-position="left">
                <el-form-item label="新密码">
                    <el-input v-model="change_pass.new_pass" show-password>

                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="change_pass.qr" show-password>

                    </el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="ok_change()" type="success" style="margin-left:186px">
                    确认修改
                </el-button>
            </div>
        </el-dialog>
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
        <div v-show="active == 6">
            <ylkcl :part="active" :id="6"></ylkcl>
        </div>
    </div>
</template>

<script>
import lbt from '@/view/MyLbt.vue'
import zjxx from '@/view/MyZjxx.vue'
import ylkcl from '@/view/MyYlkCl.vue'
export default {
    components: {
        lbt: lbt,
        zjxx: zjxx,
        ylkcl: ylkcl
    },
    data() {
        return {
            active: 1,
            MainSwiper: [],
            show_change_pwd: false,
            change_pass: {
                new_pass: "",
                qr: "",
            }
        }
    },
    methods: {
        ok_change() {
            if (this.change_pass.new_pass == this.change_pass.qr)//相等
            {
                this.show_change_pwd = false;
                this.$axios.request({
                    method: 'POST',
                    url: "/api/user/change",
                    data: {
                        token: localStorage.getItem('token'),
                        new_password: this.change_pass.new_pass,
                    },
                }).then((res) => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: 'ok',
                        }),
                            window.localStorage.removeItem('token');//删去token
                        this.$router.push('/login');//路由跳转
                    }
                })

            }
            else {
                this.$message({
                    type: 'error',
                    message: '确认密码与新密码不匹配',
                })
            }
        },
        change_pwd() {
            this.show_change_pwd = true;
        },
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