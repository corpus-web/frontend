<template>
    <div class="frequency">
        <el-table :data="tableData" border style="width: 76.8rem;text-align: center;" height="40rem" v-loading="loading2"
            :header-cell-style="{ background: 'rgba(190, 190, 190, 1)', color: '#606266', fontSize: '1rem' }">
            <el-table-column label="No." type="index" width="100" align="center">
            </el-table-column>
            <el-table-column prop="fname" label="Filename" width="280" align="center">
            </el-table-column>
            <el-table-column prop="s_name" align="center">
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
    // "longtext":要高亮的词
    // "total"：总共的索引数
    // "indexnum"：索引条数，要展示在表格第三列的表头,每一页显示条数
    // "currentPageData"：表格的数据
    data() {
        return {


            currentPage: 1, //当前页数 ，默认为1
            copycurrentPage: 1, //当前页数副本 ，默认为1

            // currentPageData: [], //当前页显示内容
            headPage: 1,
            // showp: '',
            order: 'Random Order',
            randomcase: false,//1表示Show Corpus；2表示Random Order
            // title: "五百年前孙悟空大闹天宫",
            // searchWord: "孙悟空",
            pack: {
                page: 0,
                rank: true,

            },
            keytype1: '',
            keytype2: '',
        }
    },

    mounted() {

    },
    methods: {
        getCurrentPageData() {
            this.pack.page = this.currentPage;
            this.pack.rank = this.randomcase;
            this.$emit('turnpage', this.pack)


        },
        //首页
        firstpage() {
            if (this.currentPage == 1) {
                return false;
            } else {
                this.currentPage = this.headPage;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        //上一页
        prevPage() {
            if (this.currentPage == 1) {
                return false;
            } else {
                this.currentPage--;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        // 下一页
        nextPage() {
            // console.log("下一页")
            if (this.currentPage == this.pageSize) {
                return false;
            } else {
                this.currentPage++;
                this.copycurrentPage = this.currentPage;
                this.getCurrentPageData();
            }
        },
        //尾页
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
        change() {
            this.getCurrentPageData();
            if (this.order == 'Show Corpus') {
                this.order = 'Random Order';
                this.randomcase = false;
                this.getCurrentPageData();
                // console.log(1)
            }
            else {
                this.order = 'Show Corpus';
                this.randomcase = true;
                this.getCurrentPageData();
                // console.log(2)
            }
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
        getCaption(obj) {
            const index = obj.lastIndexOf(this.keytype)
            const res = obj.substring(index+2, index+3)
            if(!(res.match(/^[ ]*$/))){
                console.log("res"+res+"line"+obj)
                return false
            }

            return true
        },
        getCaption1(obj) {
            const index = obj.lastIndexOf(this.keytype1)
            const res = obj.substring(index+2, index+3)
            if(!(res.match(/^[ ]*$/))){
                console.log("res"+res+"line"+obj)
                return false
            }

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
            console.log("首字母大写:" + this.keytype1)
            if (line.includes(this.keytype) && this.getCaption(line)) {
                line = line.replace(
                    this.keytype,
                    // 这里是替换成html格式的数据，最好再加一个样式权重，保险一点
                    '<font style="color:red!important;">' + this.keytype + '</font>'
                )
                // return line
            }
            if (this.limitcase == false && line.includes(this.keytype1) && this.getCaption1(line)) {
                line = line.replace(
                    this.keytype1,
                    // 这里是替换成html格式的数据，最好再加一个样式权重，保险一点
                    '<font style="color:red!important;">' + this.keytype1 + '</font>'

                )
                // return line
            }
            if (this.limitcase == false && line.includes(this.keytype2)) {
                // console.log("大写:"+this.keytype2)
                line = line.replace(
                    this.keytype2,
                    // 这里是替换成html格式的数据，最好再加一个样式权重，保险一点
                    '<font style="color:red!important;">' + this.keytype2 + '</font>'

                )
                // return line
            }
            // 不包含的话还用这个

            return line

        },

    },
}
</script>

<style>
.el-table {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-table tr {
    background-color: rgba(231, 230, 230, 1);
    padding: 0.1rem 0.1rem;
}

.el-table thead {
    background-color: rgba(231, 230, 230, 1);
}

/**
改变边框颜色
 */
.el-table--border,
.el-table--group {
    border: 1px solid #ffffff !important;
}

/**
改变表格内行线颜色
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
