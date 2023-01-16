<template>
  <div>
    <my-header></my-header>
    <div class="home" style="width:78rem;margin: auto; ">

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
      <!-- 文字介绍 -->
      <div class="introduce">
        <div class="title1">
          Corpus of Shipbuilding and Oceanography Engineering and Nuclear Science
        </div>
        <div class="title1">
          (COSON)
        </div>
        <div class="title2">
          -Size of COSON as of 9th September, 2022: Around 9 million words-
        </div>
        <div class="content">
          COSON is based on the school-based characteristics of Harbin Engineering University, aiming to collect English
          research papers published in high-impact international journals from 2016 to 2020, containing of around 9
          million words and covering the discipline of Shipbuilding and Oceanography Engineering and Nuclear Science.
          The
          text sampling taxonomy for the corpus follows the Chinese National System of Level One Disciplines for Degree
          Educational. The principle of sample selection takes into account the authority and impact factors of the
          journals, and the selected journals are all SCI international journals, and the impact factors are high in the
          discipline.

        </div>
      </div>
      <!-- 思维导图 -->
      <div class="Mindmapping">
        <img src="../assets/images/Mindmapping.png" alt="Mind mapping" width="100%">
      </div>
      <div style="display: flex;">
        <div class="button" @click="$router.push('/Search')">
          Go Searching
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  created() {
    this.getbannerList();
  },
  data() {
    return {
      bannerList: [],
    }
  },
  methods: {
    getbannerList() {
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/main",
      }).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.bannerList = res.data;
        }

      })
    }
  },
  
}
</script>

<style>
.Mindmapping {
  height: 40rem;
  display: flex;
  margin-left: 3rem;
  /* width: 75rem; */
}

#img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.introduce .title1 {
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.introduce .title2 {
  /* font-weight: 800; */
  padding-top: 1.5rem;
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.introduce .content {
  text-indent: 2rem;
  text-align: justify;
  margin: 0 auto;
  width: 75rem;
  /* font-weight: 800; */
  padding-top: 1.5rem;
  font-size: 1.2rem;
  /* text-align: center; */
  font-family: 'Times New Roman', Times, serif;
}

.button {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  cursor: pointer;
  background-color: rgba(47, 85, 151, 1);
  color: white;
  font-weight: 700;
  font-size: 2.1rem;
  text-align: center;
  width: 16rem;
  height: 2.7rem;
  /* margin-right: 1rem; */
  margin-left: auto;
  margin-bottom: 0.5rem;
}

/* 轮播图 */
.body1 {
  height: 26rem;
  width: 100%;
}

.swiper-container {
  height: 26rem;
  width: 100%;

}
</style>

