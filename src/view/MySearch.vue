<template>
  <div class="about" style="width: 76.8rem;margin: auto; border: 1px solid #e5e5e5;">
    <my-header></my-header>
    <my-image></my-image>
    <div class="menu">
      <div :class="[searchclick ? click : unclick]" @click="search">
        Serch
      </div>
      <div :class="[frequencyclick ? click : unclick]" @click="frequency">
        Frequency
      </div>
      <div :class="[contextclick ? click : unclick]" @click="context">
        Context
      </div>
    </div>
    <div class="content">
      <div class="search" v-if="searchclick">
        <div class="graybox">
          <textarea v-model="longtext" id="longinput" placeholder="add multiple lines"></textarea>
          <div class="buttonbox">
            <div class="buttonlight" style="width: 62%;cursor: pointer;" @click="startsearch">
              Start Searching
            </div>
            <div class="buttonlight" style="width: 32%;cursor: pointer;" @click="reset">
              Reset
            </div>
          </div>
          <div class="selectionbox">
            <div class="tickbox">
              <input type="checkbox" id="checkbox" v-model="limitcase" />
              <div class="buttondark" style="width: 62%;">
                Case-sensitive
              </div>
            </div>
            <div class="tickbox">
              <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                Search window size
              </div>
              <select v-model="bothnum" id="selectbox">
                <option disabled value=""></option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
                <option>125</option>
                <option>150</option>
              </select>
            </div>

            <div class="tickbox">
              <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                Number of hits per page
              </div>
              <select v-model="indexnum" id="selectbox">
                <option disabled value=""></option>
                <option>50</option>
                <option>100</option>
                <option>150</option>
              </select>
            </div>

            <div class="tickbox">
              <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                Save list
              </div>
              <select v-model="saveyes" id="selectbox">
                <option disabled value=""></option>
                <option>Yes</option>
                <option>No</option>

              </select>
            </div>

          </div>
        </div>
        <div class="graybox1">

          <div class="graysmall" style="margin-top:2rem ;">
            Case-Sensitive determines whether The result and the result would be two different searches, or It finds, it
            finds, It Finds.
          </div>

          <div class="graysmall">
            Search Window Size refers to the number of characters on either side of the search word.
          </div>
          <div class="graysmall">
            Number of Hits per Page means the number of hits that you have searched in one page.
          </div>
        </div>
      </div>
      <div v-else-if="frequencyclick" class="frequency">
        <frequency :currentPageData="currentPageData" :longtext="longtext" :indexnum="indexnum"
          :resindexnum="resindexnum" @jump="jump"></frequency>
      </div>
      <div v-else-if="contextclick" class="context">
        <context :par="par"></context>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import frequency from './MyFrequency.vue'
import context from './MyContext.vue'
export default {
  components: {
    frequency: frequency,
    context: context,
  },
  data() {
    return {
      searchclick: true,
      frequencyclick: false,
      contextclick: false,
      click: 'click',
      unclick: 'unclick',
      longtext: '',//检索框内容
      limitcase: false,//默认不限制大小写
      bothnum: 50,//被检索词两边的字符数
      indexnum: 50,//索引条数
      resindexnum: '',//后端返回的索引条数
      saveyes: '',//选择yes能够保存检索列表
      currentPageData: [],
      par: ''//context页面要展示的文字的par
    }
  },
  methods: {
    search() {
      this.searchclick = true;
      this.frequencyclick = false;
      this.contextclick = false;
    },
    frequency() {
      this.searchclick = false;
      this.frequencyclick = true;
      this.contextclick = false;
    },
    context() {
      this.searchclick = false;
      this.frequencyclick = false;
      this.contextclick = true;
    },
    // 对检索框内容进行检索
    startsearch() {


      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/article",
        params: {
          word: this.longtext,// 检索内容
          window_size: this.bothnum,// 检索词两边的字符数
          max_num: this.indexnum,// 一页展示的索引条数
        }

      }).then((res) => {
        this.$message({
          showClose: true,
          message: '开始检索……',
          type: 'success'
        });
        this.currentPageData = res.data.data
        this.resindexnum = res.data.total

      })
      this.searchclick = false;
      this.frequencyclick = true;
      this.contextclick = false;

    },
    // 重置检索框内容
    reset() {
      this.longtext = ''
    },
    jump(t) {
      console.log(t)
      this.par = t;

      this.searchclick = false;
      this.frequencyclick = false;
      this.contextclick = true;

    }
  }
}
</script>

<style>
.menu {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.click {
  cursor: pointer;
  background-color: rgba(47, 85, 151, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  width: 33.1%;
  height: 3rem;
  line-height: 3rem;
}

.unclick {
  cursor: pointer;
  background-color: rgba(143, 170, 220, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  width: 33.1%;
  height: 3rem;
  line-height: 3rem;
}

.search {

  padding: 2rem 9rem;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.frequency {

  padding: 2rem 9rem;
}

.context {

  padding: 2rem 9rem;
}

.graybox {
  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 1rem;
}

.graybox1 {
  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 2rem 1rem;
  color: rgba(47, 85, 151, 1);
  font-weight: 700;
  font-size: 1.2rem;
  /* text-align: center; */
  line-height: 3rem;
}

.graysmall {
  text-indent: 2rem;
  text-align: justify;
  padding-top: 2rem;
}

.buttonbox {
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;

}

.buttondark {
  background-color: rgba(47, 85, 151, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  line-height: 2rem;
  height: 2rem;

}

.buttonlight {
  background-color: rgba(143, 170, 220, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  height: 2rem;
  line-height: 2rem;

}

.tickbox {
  display: flex;
  padding: 0.4rem 0;
}

#longinput {
  width: 100%;
  min-height: 10rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: black;
}

#checkbox {
  width: 7%;

}

#selectbox {
  width: 3rem;
}
</style>
