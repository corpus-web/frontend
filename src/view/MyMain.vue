<template>
    <!-- style="background-image: linear-gradient(to bottom,#d8dfe2,white)" -->
    <div style="background-image: linear-gradient(to bottom,#d8dfe2,white)">
        <div class="main" style="width:76.8rem;margin: auto;">
            <my-header></my-header>
            <!-- 轮播图 -->
            <div class="body1">
                <div class="swiper-container">
                    <el-carousel trigger="click" height="26rem" indicator-position="none">
                        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                            <img :src="item.pictureurl" id="img">
                            <!-- <el-image :src=item.pictureurl fit="cover" id="img"></el-image> -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <!-- 最近动态 -->

            <div id="wp_w">
                <div class="lasted_div">
                    <div class="i-title">
                        <img src="@/assets/images/ggtz.png">
                    </div>

                    <div v-for="(tt, index) in text" :key="index" v-show="index == newsLi">
                        <span class="news_title">{{ liContent[index] }}</span>
                        <div class="latest">
                            <ul>
                                <!-- 从后端获取数据 -->
                                <li class="short_text" v-for="(pp, index) in tt" :key="index">
                                    <div class="short_text">
                                        <span class="short_text_span" @click=detail(pp.aid)>{{ pp.title }}</span>
                                    </div>
                                    <span style="float:right;color: #bcbcc1;">{{ pp.update_time }}</span>
                                </li>

                            </ul>
                        </div>

                    </div>


                    <!-- <span class="news_title">课程建设</span>
                    <div class="latest">

                        <ul>
                            
                            <li class="short_text" v-for="(tt, index) in text" :key="index" :v-show="tt.id == navli">
                                <div class="short_text">
                                    <span class="short_text_span" @click=detail(tt.id)>{{ tt.text }}</span>
                                </div>
                                <span style="float:right;color: #bcbcc1;">{{ tt.time }}</span>
                            </li>

                        </ul>
                    </div> -->
                    <div class="more">
                        <div class="more_btn" @click="more()">
                            <el-button type="primary" style="background-color:#607d8b;border: #607d8b;">查看更多</el-button>
                        </div>
                        <!-- <button>查看更多</button> -->
                    </div>
                </div>
                <ul class="wp_nav">
                    <li class="nav-item" id="i1" @mouseenter="enter(0)" @mouseleave="leave()"
                        :class="0 === navLi ? 'active' : 'unactive'" @click="select(0)">
                        <span class="item-name">课程建设</span>
                        <div class="mark" v-show="navLi == 0">课程建设</div>
                    </li>
                    <li class="nav-item " id="i2" @mouseenter="enter(1)" @mouseleave="leave()"
                        :class="1 === navLi ? 'active' : 'unactive'" @click="select(1)">
                        <span class="item-name">学术交流</span>
                        <div class="mark" v-show="navLi == 1">学术交流</div>
                    </li>
                    <li class="nav-item" id="i3" @mouseenter="enter(2)" @mouseleave="leave()"
                        :class="2 === navLi ? 'active' : 'unactive'" @click="select(2)">
                        <span class="item-name">团队风采</span>
                        <div class="mark" v-show="navLi == 2">团队风采</div>
                    </li>
                    <li class="nav-item" id="i4" @mouseenter="enter(3)" @mouseleave="leave()"
                        :class="3 === navLi ? 'active' : 'unactive'" @click="select(3)">
                        <span class="item-name">语料库</span>
                        <div class="mark" v-show="navLi == 3">语料库</div>
                    </li>

                </ul>
            </div>
            <my-footer></my-footer>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>


export default {
    // name: 'MyMain',
    created() {
        this.getbannerList();
        this.gettext();
    },
    data() {
        return {
            //轮播图轮播的图片的地址
            bannerList: [],
            liContent: ["课程建设", "学术交流", "团队风采", "语料库"],
            navLi: -1,
            newsLi: 0,
            text: [],
        }
    },


    methods: {
        select(index) {
            if (index == 0) {
                // this.$router.replace("/Course");
                this.$router.push('/Course');
            } else if (index == 1) {
                this.$router.push("/Academic");
            } else if (index == 2) {
                this.$router.push("/Group");
            } else if (index == 3) {
                this.$router.push("/home");
            }
        },
        enter(index) {
            this.navLi = index;
            this.newsLi = index;
        },
        leave() {
            this.navLi = -1;
        },
        //获取轮播图照片
        getbannerList() {
            this.$axios.request({
                method: 'GET',
                url: "/api/home/main",
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.bannerList = res.data;
                } else {
                    alert("出错啦！")
                }

            })
        },
        // 获取所有的text数据
        gettext() {
            this.$axios.request({
                method: 'GET',
                url: "/api/home/text",
            }).then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    this.text = res.data;
                } else {
                    alert("出错啦！")
                }

            })
        },
        //进入更多页面
        more() {
            // 详细内容的页面,两个括号
            this.$router.push({
                path: '/detail',
                query: { part_id: this.newsLi }
            })
        },
        // news(news_id) {
        //     this.$router.push({
        //         path: '/news',
        //         query: {
        //             part_id: this.newsLi,
        //             news_id: news_id
        //         }
        //     })
        // },
        //进入新闻详情页面
        detail(aid) {
            this.$router.push({
                path: "/news",
                query: {
                    part_id: this.newsLi,
                    news_id: aid
                }
            })
        }
    }
}
</script>

<style scoped>
/* .mian {
    display: flex;
} */


/* 轮播图 */
.body1 {
    height: 26rem;
    width: 100%;
}

.swiper-container {
    height: 26rem;
    width: 100%;
    background-color: skyblue;
}

/* 图片位cover自适应 */
#img {
    width: 100%;
    height: 100%;
    /* object-position: center; */
    object-position: 50% 50%;
    /* object-fit: cover; */
}

.unactive {
    background-color: #d9e2f3;
}

.active {
    background-color: #2f5496;
    /* background-color: red; */
    color: white;
}

.latest {
    margin-left: 7rem;
}

.latest ul {
    height: 15rem;
    margin-bottom: 0;
}

.latest li {
    list-style-type: none;
    height: 2rem;
    width: 30rem;
    margin-bottom: 1rem;
    line-height: 2rem;
    font-size: larger;
    font-family: Microsoft YaHei;
    border-bottom: 1px solid #e5e5e5;
}

.short_text {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20rem;
}

.short_text_span {
    cursor: pointer;
}



/* 大盒子 */
#wp_w {
    position: relative;
    margin-top: 7rem;
    height: 49rem;
    font: 14px/1 Microsoft YaHei;
    color: #333;
    background: url(@/assets/images/sec_bg.jpg);
}

.lasted_div {
    position: absolute;
    width: 50rem;
    height: 390px;
    top: -7rem;
    left: 14rem;
    background-color: white;
}

.more {
    margin-top: 6px;
    height: 2.5rem;
}

.more_btn {
    width: 96px;
    height: px;
    margin: auto;
    /* background: url(@/assets/images/checkmore.png) no-repeat center; */
    cursor: pointer;
}

.wp_nav {
    position: absolute;
    height: 309px;
    top: 22rem;
    padding: 0;
    display: inline-block;

}

.i-title {
    height: 4rem;
}

.i-title img {
    margin-left: 40%;
    /* width: 60px; */
    /* margin: auto; */
}

/* nav中小li的样式 */
.nav-item {
    width: 239px;
    height: 309px;
    display: inline-block;
    float: left;
    position: relative;
    vertical-align: bottom;
    margin-left: 55px;
    text-align: center;
}

.item-name {
    /* margin: auto; */
    /* margin-left: 78px; */
    margin-top: 245px;
    display: inline-block;
    padding: 5px 10px;
    line-height: 22px;
    cursor: pointer;
}

#i1 {
    background: url(@/assets/images/kcjs.png) no-repeat center;
}

#i2 {
    background: url(@/assets/images/xsjl.png) no-repeat center;
}

#i3 {
    background: url(@/assets/images/tdfc.png) no-repeat center;
}

#i4 {
    background: url(@/assets/images/ylk.png) no-repeat center;
}

.mark {
    position: absolute;
    left: 0;
    top: 0;
    height: 309px;
    width: 100%;
    line-height: 309px;
    background-color: rgb(31, 29, 29);
    opacity: 0.8;
    font-size: large;
    cursor: pointer;
    /* color: black; */
}

.news_title {
    display: inline-block;
    margin-left: 50px;
    font-size: x-large;
    /* color: #013064; */
    color: #607d8b;
}
</style>