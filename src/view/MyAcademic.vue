<template>

    <div style="width: 76.8rem;margin: auto; border: 1px solid #e5e5e5;">
        <my-header></my-header>
        <my-image></my-image>
        <div id="body">
            <div class="swiper-container">
                <el-carousel indicator-position="outside" trigger="click" height="31.44rem">
                    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                        <img :src="item.pictureurl" id="img">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div id="text">
                <span @click="$router.push({ path: '/detail', query: { part_id: 1 } })"
                    style="position:absolute;top:0.393rem;right:0.96rem;color:#46689f;cursor:pointer;font-size:larger">更多</span>
                <ul style="margin-top:2.751rem">
                    <li v-for="(litext, index) in text" :key="index">

                        <div @click="select(litext.aid)">{{ index + 1 }}.&nbsp;{{ litext.title }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <router-view></router-view> -->
        <my-footer></my-footer>

    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerList: [],
            text: [],
        }
    },
    created() {
        this.getbannerList();
        this.getnews();
    },
    methods: {
        getbannerList() {
            this.$axios.request({
                method: 'GET',
                url: '/api/academic/main'
            }).then((res) => {
                // console.log("/api/academic/main");
                if (res.status == 200) {
                    this.bannerList = res.data;
                } else {
                    alert("出错啦！")
                }
            })
        },
        getnews() {
            this.$axios.request({
                method: 'GET',
                url: '/api/academic/title'
            }).then((res) => {
                console.log("/api/academic/title");
                if (res.status == 200) {
                    this.text = res.data.data;
                } else {
                    alert("出错啦！")
                }
            })
        },
        select(index) {
            this.$router.push({
                path: "/text",
                query: {
                    part_id: 1,
                    academic_id: index
                }
            })
        }
    },
}
</script>

<style scoped>
#body {
    position: relative;
    height: 31.44rem;
}

.swiper-container {
    position: absolute;
    top: 0;
    left: 1.92;
    width: 36.48rem;
    /* border-right: 1px solid blue; */
}

#img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
}

#text {
    position: absolute;
    height: 31.47rem;
    width: 40.3rem;
    left: 36.5rem;
    background-color: #f2f2f2;
}

#text li {
    /* list-style-type: disc; */
    font-family: "宋体";
    font-size: larger;
    margin-bottom: 1rem;
}

#text li div {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 2.358rem;
    width: 33.6rem;
    cursor: pointer;
    margin-top: 1px;
}

#text li div:hover {
    color: rgb(39, 177, 231);
}
</style>