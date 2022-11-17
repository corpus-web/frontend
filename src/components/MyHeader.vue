<!-- <template>
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

.header {
    height: 6.86rem;
    
    background: url(@/assets/images/logo4.png) no-repeat;


    position: relative;

}
</style> -->
<template>
    <div>
        <div id="top">
            <div class="main">
                <div id="img">
                    <img src="@/assets/images/header.png" width="100" height="60" border="0" title="哈工程语料库">
                </div>
                <div style="float:left;padding-left:=120px;padding-top:5px">
                    <table width="80%">
                        <tbody>
                            <tr>
                                <td style="color:#fff;font-size:2.0em;">哈工程语料库语言学|Corpus Linguistics, Harbin
                                    Engineering
                                    University</td>
                            </tr>
                            <!-- <tr>
                                <td style="color:white; font-size:1.0em; margin-top:7px; line-height:25px;">Foreign
                                    Language
                                    Education Research Informed by Corpora (FLERIC), BFSU</td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>


        </div>

        <div style="width:100%;background-color: #fff;border-bottom: 1px solid #e5e5e5;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                text-color="#000" style="display:flex;justify-content:space-between;width: 80%;margin: auto;">
                <el-menu-item index="0">首页</el-menu-item>
                <el-menu-item index="1">课程建设</el-menu-item>
                <el-menu-item index="2">学术交流</el-menu-item>
                <el-menu-item index="3">团队风采</el-menu-item>
                <el-menu-item index="4">语料库</el-menu-item>
                <el-submenu style="">
                    <template slot="title">友情链接</template>
                    <el-menu-item index="5-1">哈尔滨工程大学</el-menu-item>
                    <el-menu-item index="5-2">图书馆</el-menu-item>
                    <el-menu-item index="5-3">外国语学院</el-menu-item>
                    <el-menu-item index="5-4">国际交流学院</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleSelect(index) {
            if (index == 0)
                this.$router.push('/Main');
            else if (index == 1)
                this.$router.push('/Course');
            else if (index == 2)
                this.$router.push('/Academic');
            else if (index == 3)
                this.$router.push('/Group');
            else if (index == 4)
                this.$router.push('/home');
            else if (index == "5-1")
                window.open('http://www.hrbeu.edu.cn/ ')
            else if (index == "5-2")
                window.open('http://lib.hrbeu.edu.cn/ ')
            else if (index == "5-3")
                window.open('http://fld.hrbeu.edu.cn/')
            else if (index == "5-4")
                window.open('http://heucice.hrbeu.edu.cn/ ')
        }
    },
}
</script>

<style scoped>
#top {
    width: 100%;
    height: 10rem;
    background-color: #dc6d20;
    background-color: #003d81;
}

.main {
    width: 1100px;
    margin: auto;
    margin-left: 8rem;
}

#img {
    padding: 18px 0;
    display: inline;
}

.el-menu-item {
    height: 3rem;
    line-height: 3rem;
}

.el-submenu {
    height: 2rem;
    line-height: 2rem;
}

/deep/ .el-menu.el-menu--horizontal {
    border: none;
}

/deep/.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
}
</style>