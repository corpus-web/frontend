<template>
  <div>
    <my-header></my-header>
    <div class="about" style="width: 76.8rem;margin: auto; border: 1px solid #e5e5e5;">
      <my-image></my-image>
      <div class="menu">
        <div :class="[searchclick ? click : unclick]" @click="search">
          Search
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

                <div class="buttondark" style="width: 62%;">
                  Case-sensitive
                </div>
                <input type="checkbox" id="checkbox" v-model="limitcase" />
              </div>
              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Search window size
                </div>
                <select v-model="bothnum" id="selectbox">
                  <option disabled value=""></option>
                  <option>50</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                  <option>500</option>
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
                  Retrieval range
                </div>
                <select v-model="choice" id="selectbox">
                  <option disabled value=""></option>
                  <option>the whole corpus</option>
                  <option>sub-corpus of Shipbuilding-</option>
                  <option>sub-corpus of Nuclear-</option>

                </select>
              </div>

              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Query Method
                </div>
                <select v-model="querymethod" id="selectbox">
                  <option disabled value=""></option>
                  <option>word query</option>
                  <option>regular query</option>
                </select>
              </div>

            </div>
          </div>
          <div class="graybox1">

            <div class="graysmall">
              Case-Sensitive determines whether The result and the result would be two different searches, or It finds,
              it
              finds, It Finds.
            </div>

            <div class="graysmall">
              Search Window Size refers to the number of characters on either side of the search word.
            </div>
            <div class="graysmall">
              Number of Hits per Page means the number of hits that you have searched in one page.
            </div>
            <div class="graysmall">
              Retrieval range refers to the corpus in which the target is retrieved. It includes the whole corpus as
              well as the two sub-corpora, Nuclear Science Academic English Corpus and Shipbuilding and Oceanography
              Engineering Academic English Corpus.
            </div>
            <div class="graysmall">
              Query method serves for both word query and regular query.
            </div>
          </div>
        </div>
        <div v-else-if="frequencyclick" class="frequency">
          <frequency :currentPageData="currentPageData" :longtext="longtext" :indexnum="indexnum" :bothnum="bothnum"
            :loading1="loading1" :limitcase="limitcase" @jump="jump"></frequency>
        </div>
        <div v-else-if="contextclick" class="context">
          <context :tableData="tableData" :longtext="longtext" :indexnum="indexnum" :keytype="keytype" :fre="fre"
            :bothnum="bothnum" :pageSize="pageSize" :loading2="loading2" :limitcase="limitcase"
            :resindexnum="resindexnum" @turnpage="turnpage"></context>
        </div>
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
      loading1: false,
      loading2: false,
      searchclick: true,
      frequencyclick: false,
      contextclick: false,
      click: 'click',
      unclick: 'unclick',
      longtext: '',//???????????????
      newlongtext: '',//???????????????????????????
      limitcase: false,//????????????????????????
      bothnum: 50,//??????????????????????????????
      indexnum: 50,//????????????
      resindexnum: 0,//???????????????????????????
      pageSize: 1, // ????????????????????????1
      choice: 'the whole corpus',//????????????????????????????????????
      choicenum: 0,
      querymethod: 'word query',//??????????????????
      querymethodnum: 0,
      currentPageData: [],
      par: '',//context???????????????????????????par
      keytype: '',
      searchname: '',
      fre: '',
      tableData: []
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
    // ??????
    escape(n) {
      // % ???%25??????
      n = n.replace(/%/g, "%25")
      // ?????? ???%20??????
      n = n.replace(/ /g, "%20")
      // " ???%22??????
      n = n.replace(/"/g, "%22")
      // # ???%23??????
      n = n.replace(/#/g, "%23")
      // &???%26??????
      n = n.replace(/&/g, "%26")
      // ( ???%28??????
      n = n.replace(/\(/g, "%28")
      // ) ???%29??????
      n = n.replace(/\)/g, "%29")
      // + ???%2B??????
      n = n.replace(/\+/g, "%2B")
      // , ???%2C??????
      n = n.replace(/,/g, "%2C")
      // / ???%2F??????
      n = n.replace(/\//g, "%2F")
      // : ???%3A??????
      n = n.replace(/:/g, "%3A")
      // ; ???%3B??????
      n = n.replace(/;/g, "%3B")
      // < ???%3C??????
      n = n.replace(/</g, "%3C")
      // = ???%3D??????
      n = n.replace(/=/g, "%3D")
      // > ???%3E??????
      n = n.replace(/>/g, "%3E")
      // ? ???%3F??????
      n = n.replace(/\?/g, "%3F")
      // @ ???%40??????
      n = n.replace(/@/g, "%40")
      // \ ???%5C??????
      n = n.replace(/\\/g, "%5C")
      // | ???%7C??????
      n = n.replace(/\|/g, "%7C")
      return n
    },
    // ??????????????????????????????
    startsearch() {
      this.newlongtext = this.longtext
      if (this.newlongtext == '') {
        this.$message({
          message: '????????????????????????',
          type: 'warning'
        });
      }
      else {

        const firstChar = this.newlongtext.charAt(0);
        console.log(firstChar)
        const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ/\\(_"
        if (!letters.includes(firstChar)) {
          console.log("???????????????")
          this.$message.error('??????????????????????????????????????????');
          
        }
        else {
          if (this.choice == 'the whole corpus') {
            this.choicenum = 0
          }
          else if (this.choice == 'sub-corpus of Shipbuilding-') {
            this.choicenum = 1
          }
          else if (this.choice == 'sub-corpus of Nuclear-') {
            this.choicenum = 2
          }
          if (this.querymethod == 'word query') {
            this.querymethodnum = 0
          }
          else if (this.querymethod == 'regular query') {
            this.querymethodnum = 1
          }
          this.loading1 = true;
          this.$axios.request({
            method: 'GET',
            url: "/api/corpus/format",
            params: {
              word_or_regex: this.newlongtext,// ????????????
              limit_case: this.limitcase,//???????????????
              window_size: this.bothnum,// ???????????????????????????
              per_page: this.indexnum,// ???????????????????????????
              category: this.choicenum,//????????????????????????????????????
              query_method: this.querymethodnum,//??????????????????
            }

          }).then((res) => {
            // this.$message({
            //   showClose: true,
            //   message: '??????????????????',
            //   type: 'success'
            // });
            this.loading1 = false;
            this.currentPageData = res.data
            // this.resindexnum = res.data.total

          })
          this.searchclick = false;
          this.frequencyclick = true;
          this.contextclick = false;
        }


      }


    },
    // ?????????????????????
    reset() {
      this.longtext = ''
    },
    jump(t) {
      this.loading2 = true;
      this.keytype = t.name;
      this.searchname = t.searchname;
      this.fre = t.num;
      // console.log("keytype"+this.keytype)
      // console.log(t);
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/files",
        params: {
          'word_or_regex': t.searchname,// ????????????key?????????                       
          'limit_case': this.limitcase,//???????????????
          'window_size': this.bothnum,// ???????????????????????????
          'per_page': this.indexnum,// ???????????????????????????
          'page': 1,
          'category': this.choicenum,//????????????????????????????????????
          'query_method': this.querymethodnum,//??????????????????
        }

      }).then((res) => {
        this.loading2 = false;
        // this.$message({
        //   showClose: true,
        //   message: '??????????????????',
        //   type: 'success'
        // });
        this.tableData = res.data.data;
        this.resindexnum = res.data.total;
        this.pageSize = Math.ceil(this.resindexnum / this.indexnum);
        // console.log('???????????????')
        // console.log(this.tableData);
        // console.log(this.resindexnum)
      })


      this.searchclick = false;
      this.frequencyclick = false;
      this.contextclick = true;

    },
    turnpage(t) {
      this.loading2 = true;
      // this.searchname=escape(this.searchname)
      // console.log("escape??????searchname"+this.searchname)
      console.log(t)
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/files",
        params: {
          'word_or_regex': this.searchname,// ????????????key?????????                    
          'limit_case': this.limitcase,//???????????????
          'window_size': this.bothnum,// ???????????????????????????
          'per_page': this.indexnum,// ???????????????????????????
          'page': t.page,
          'random_case': t.rank,
          'category': this.choicenum,//????????????????????????????????????
          'query_method': this.querymethodnum,//??????????????????
        }

      }).then((res) => {
        this.loading2 = false;
        // this.$message({
        //     showClose: true,
        //     message: '??????????????????',
        //     type: 'success'
        // });
        // eslint-disable-next-line
        this.tableData = res.data.data;


      })
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;
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

  padding: 1rem 0rem;
}

.context {

  padding: 1rem 0rem;
}

.graybox {
  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 1rem;
}

.graybox1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;

  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 0.5rem 1rem;
  color: rgba(47, 85, 151, 1);
  font-weight: 700;
  font-size: 1.2rem;
  /* text-align: center; */
  line-height: 2rem;
}

.graysmall {
  text-indent: 2rem;
  text-align: justify;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.buttonbox {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;

}

.buttondark {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;
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
  font-family: 'Times New Roman', Times, serif;
  width: 100%;
  min-height: 10rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: black;
}

#checkbox {
  margin-left: 1rem;
  margin-top: 0.7rem;
  height: 1.8rem;
  width: 1.8rem;

}

#selectbox {
  font-size: 1rem;
  width: 10rem;
  margin-top: 0.6rem;
  height: 1.8rem;
  text-align: center;
}
</style>
