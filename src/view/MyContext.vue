<template>
    <div class="frequency">
        <el-table :data="tableData1" border style="width: 76.8rem;text-align: center;" height="40rem" v-loading="loading2" :key="isUpdate"
            :header-cell-style="{ background: 'rgba(190, 190, 190, 1)', color: '#606266', fontSize: '1rem' }">
            <el-table-column label="No." type="index" width="100" align="center">
            </el-table-column>
            <el-table-column prop="fname" label="Filename" width="280" align="center">
            </el-table-column>
            <el-table-column prop="fline" align="center">
                <template slot="header">
                    Solution 1 to&nbsp; {{ indexnum }}&nbsp;Page&nbsp;{{ copycurrentPage }}/{{
                        pageSize
                    }}&nbsp;&nbsp;Frequency:{{ fre }}
                </template>
                <template slot-scope="scope">
                    <span v-html="setkey(scope.row.s_name)"></span>
                </template>

            </el-table-column>
        </el-table>
        <div class="pagination">
            <div class="firstpage" @click="firstpage">
                |&lt;
            </div>
            <div class="firstpage" @click="prevPage">
                &lt;
            </div>
            <div class="firstpage" @click="nextPage">
                &gt;
            </div>
            <div class="firstpage" @click="lastPage">
                &gt;|
            </div>
            <div class="buttondark" style="width: 20%;margin-left: 5%;cursor: pointer;" @click="showpage">
                Show Page
            </div>
            <input class="pagenum" v-model.trim="currentPage" placeholder="" />
            <div class="buttondark" style="cursor: pointer;width: 30%;margin-left: 18%;margin-right: 1%;" @click="change">
                {{ order }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ["longtext", "indexnum", "tableData", "keytype", "bothnum", "choicenum", "pageSize", "loading2", "fre", "limitcase"],
    // "longtext":???????????????
    // "total"?????????????????????
    // "indexnum"??????????????????????????????????????????????????????,?????????????????????
    // "currentPageData"??????????????????
    data() {
        return {
            isUpdate:0,
            tableData1: [],
            tableDataCopy: [],
            tableDataCopyRandom: [],
            currentPage: 1, //???????????? ????????????1
            copycurrentPage: 1, //?????????????????? ????????????1
            firstcopy: true,
            // currentPageData: [], //?????????????????????
            headPage: 1,
            // showp: '',
            order: 'Random Order',
            randomcase: false,//1??????Show Corpus???2??????Random Order
            // title: "?????????????????????????????????",
            // searchWord: "?????????",
            pack: {
                page: 0,
                rank: true,

            },
            keytype1: '',
            keytype2: '',
            keytype3: '',
        }
    },
    watch: {
        tableData: function (t) {
            if (this.firstcopy == true) {
                if (t != []) {
                    this.tableData1 = this.tableData.slice();
                    this.tableDataCopyRandom = this.tableData.slice();
                    // this.tableData1 = this.tableData
                    // this.tableDataCopyRandom = this.tableData
                }
            }

        }
    },
    created() {
        // this.loading2 = false;
        // this.tableData1 = this.tableData
        // console.log("this.tableData");
        // console.log(this.tableData);
        // console.log("this.tableData1");
        // console.log(this.tableData1);
        // this.tableDataCopy = this.tableData
        // this.tableDataCopyRandom = this.tableData
        // for (let i =0;i<=this.tableDataCopyRandom.length/2;i++) {
        //     const random = Math.floor(Math.random() * this.tableData.length);
        //     // console.log("i:" + i + "random:" + random);
        //     [this.tableDataCopyRandom[i], this.tableDataCopyRandom[random]] = [this.tableDataCopyRandom[random], this.tableDataCopyRandom[i]];
        // }
        // console.log("????????????")
        // this.loading2 = true;
    },
    methods: {
        getCurrentPageData() {
            this.order = 'Random Order';
            this.pack.page = this.currentPage;
            this.pack.rank = this.randomcase;
            this.$emit('turnpage', this.pack)


        },
        //??????
        firstpage() {
            if (this.currentPage == 1) {
                return false;
            } else {
                this.currentPage = this.headPage;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        //?????????
        prevPage() {
            if (this.currentPage == 1) {
                return false;
            } else {
                this.currentPage--;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        // ?????????
        nextPage() {
            // console.log("?????????")
            if (this.currentPage == this.pageSize) {
                return false;
            } else {
                this.currentPage++;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        //??????
        lastPage() {
            if (this.currentPage == this.pageSize) {
                return false;
            } else {
                this.currentPage = this.pageSize;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }

        },
        showpage() {
            // this.currentPage = this.showp;
            if (this.currentPage == '') {
                this.currentPage = this.copycurrentPage;
            }
            else {
                if (this.currentPage >= this.pageSize) {
                    this.lastPage();
                }
                else {
                    this.getCurrentPageData();
                }
                // console.log(this.showp)
            }

        },
        // torandom() {
        //     console.log("?????????")
        //     // console.log(typeof(this.tableData))
        //     // console.log("tableData.length"+this.tableData.length)
        //     // console.log("???????????????"+this.tableDataCopyRandom[0])
        //     for(var i in this.tableData){
        //         this.tableDataCopyRandom.push(this.tableData[i])
        //     }
        //     // for (let i in this.tableDataCopyRandom) {
        //     //     const random = Math.floor(Math.random()* this.tableData.length);
        //     //     console.log("i:"+i+"random:"+random);
        //     //     [this.tableDataCopyRandom[i], this.tableDataCopyRandom[random]] = [this.tableDataCopyRandom[random], this.tableDataCopyRandom[i]];
        //     // }
        //     console.log("this.tableDataCopyRandom???tpye"+typeof(this.tableDataCopyRandom))
        //     this.tableData1 = this.tableDataCopyRandom
        // },
        // tocommon() {
        //     console.log("??????????????????")
        //     this.tableData1 = this.tableDataCopy;
        // },
        randomitem() {
            for (let i = 0; i <= this.tableDataCopyRandom.length / 2; i++) {
                const random = Math.floor(Math.random() * this.tableData.length);
                // console.log("i:" + i + "random:" + random);
                [this.tableDataCopyRandom[i], this.tableDataCopyRandom[random]] = [this.tableDataCopyRandom[random], this.tableDataCopyRandom[i]];
            }
            
            return
        },
        change() {
            this.firstcopy=false
            // this.getCurrentPageData();
            if (this.order == 'Show Corpus') {
                // ??????????????????

                this.order = 'Random Order';
                this.randomcase = false;
                this.tableData1 = this.tableData
                console.log(this.tableData[0].fline)
                // console.log(1)
            }
            else {
                // ?????????

                this.order = 'Show Corpus';
                this.randomcase = true;
                this.randomitem();
                // console.log(this.tableDataCopyRandom[0].fline)
                this.tableData1 = this.tableDataCopyRandom
                // console.log(this.tableData1[0].fline)
                // console.log(2)
            }
            this.isUpdate = !this.isUpdate;
        },

        Fisrt(arg) {
            var str = arg.split('');
            str[0] = str[0].toUpperCase();
            return str.join('');
        },
        Upper(arg) {
            var str = arg.split('');
            for (var i = 0; i < str.length; i++) {
                if (str[i].charAt() >= "a" && str[i].charAt() <= "z") {
                    str[i] = str[i].toUpperCase();
                    // console.log(str[i].toLowerCase());
                }
            }
            return str.join('');
        },
        FLower(arg) {
            var str = arg.split('');
            str[0] = str[0].toLowerCase();
            return str.join('');
        },
        getCaption(obj) {
            const index = obj.lastIndexOf(this.keytype)
            const res = obj.substring(index + 2, index + 3)
            // if(!(res.match(/^[ ]*$/)||res.match(/^[ ]*$/))){
            //     console.log("res"+res+"line"+obj)
            //     return false
            // }
            if (res >= "a" && res <= "z") {
                console.log("res" + res + "line" + obj)
                return false
            }
            // if(res=='-') return true
            // if(res.isalpha()){
            //     console.log("?????????"+obj)
            //     return false
            // }

            return true
        },
        getCaption1(obj) {
            const index = obj.lastIndexOf(this.keytype1)
            const res = obj.substring(index + 2, index + 3)
            // if(!(res.match(/^[ ]*$/))){
            //     console.log("res"+res+"line"+obj)
            //     return false
            // }
            if (res >= "a" && res <= "z") {
                console.log("res" + res + "line" + obj)
                return false
            }
            // if(res.isalpha()){
            //     return false
            // }

            return true
        },
        // getCaption1(obj) {
        //     // const index1 = obj.lastIndexOf(this.keytype1)
        //     // const res1 = obj.substring(index1, index1+1)
        //     // if(res1 >= "a" && res1 <= "z") return false
        //     // if(res1 >= "A" && res1 <= "Z") return false
        //     // return true
        // },

        setkey(line) {
            this.keytype1 = this.Fisrt(this.keytype)
            this.keytype2 = this.Upper(this.keytype)
            this.keytype3 = this.FLower(this.keytype)
            console.log("???????????????:" + this.keytype1)
            // if (line.includes(this.keytype) && this.getCaption(line)) {
            //     line = line.replace(
            //         this.keytype,
            //         // ??????????????????html???????????????????????????????????????????????????????????????
            //         '<font style="color:red!important;">' + this.keytype + '</font>'
            //     )
            //     // return line
            // }
            // if (line.includes(this.keytype1) && this.getCaption1(line)) {
            //     line = line.replace(
            //         this.keytype1,
            //         // ??????????????????html???????????????????????????????????????????????????????????????
            //         '<font style="color:red!important;">' + this.keytype1 + '</font>'

            //     )
            //     // return line
            // }
            // if (line.includes(this.keytype2)) {
            //     // console.log("??????:"+this.keytype2)
            //     line = line.replace(
            //         this.keytype2,
            //         // ??????????????????html???????????????????????????????????????????????????????????????
            //         '<font style="color:red!important;">' + this.keytype2 + '</font>'

            //     )
            //     // return line
            // }
            // ?????????
            // const index = line.lastIndexOf(this.keytype)
            // const res = line.substring(index + 2, index + 3)
            // let linenew
            // if (res >= "a" && res <= "z") {
            //     linenew = line.slice(0, index);
            //     const index = linenew.lastIndexOf(this.keytype)
            //     res = linenew.substring(index + 2, index + 3)
            // }

            // let arr = line.split('')
            // for (let i = index; i < index + this.keytype.length; i++) {
            //     arr[i] = '<font style="color:red!important;">' + arr[i] + '</font>'
            // }
            // line = arr.join('')
            let arr = line.split('')
            for (let i = 0; i < arr.length; i++) {
                let sub = arr.slice(i, i + this.keytype.length)
                let substr = sub.join('')
                if (substr == this.keytype || substr == this.keytype1 || substr == this.keytype2 || substr == this.keytype3) {
                    const res = line.substring(i + this.keytype.length, i + this.keytype.length + 1)
                    if (!(res >= "a" && res <= "z")) {
                        for (let j = i; j < i + this.keytype.length; j++) {
                            arr[j] = '<font style="color:red!important;">' + arr[j] + '</font>'
                        }
                    }
                }
            }
            line = arr.join('')
            // ???????????????????????????

            return line

        },

    },
}
</script>

<style>
.el-table {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "????????????", Arial, sans-serif;
}

.el-table tr {
    background-color: rgba(231, 230, 230, 1);
    padding: 0.1rem 0.1rem;
}

.el-table thead {
    background-color: rgba(231, 230, 230, 1);
}

/**
??????????????????
 */
.el-table--border,
.el-table--group {
    border: 1px solid #ffffff !important;
}

/**
???????????????????????????
 */
.el-table td,
.el-table th.is-leaf {
    border: 1.5px solid #ffffff !important;
}

.pagination {
    margin-top: 0.3rem;
    display: flex;
    background-color: rgba(218, 227, 243, 1);
    height: 2.7rem;
}

.firstpage {
    cursor: pointer;
    background-color: #ffffff;
    border: 0.1rem solid black;
    width: 2rem;
    height: 1.8rem;
    text-align: center;
    line-height: 1.5rem;
    margin-top: 0.5rem;
    margin-left: 0.8rem;
    font-weight: 800;
}

.buttondark {
    background-color: rgba(47, 85, 151, 1);
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 0.5rem;
    line-height: 2rem;
    height: 2rem;

}

.pagenum {
    width: 3.8rem;
    margin-top: 0.4rem;
    margin-left: 0.8rem;
    font-size: 1.8rem;
    height: 1.8rem;
    text-align: center;
    border: 0.1rem solid black;
}
</style>
