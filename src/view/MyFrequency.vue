<template>
    <div class="frequency">
        <el-table :data="currentPageData" border style="width: 76.8rem;text-align: center;" height="19.7rem"
            @row-click="rowclick"
            :header-cell-style="{ background: 'rgba(231, 230, 230, 1)', color: '#606266', fontSize: '1rem' }">
            <el-table-column prop="id" label="No." width="180" align="center">
            </el-table-column>
            <el-table-column prop="fname" label="Filename" width="180" align="center">
            </el-table-column>
            <el-table-column prop="fline" label="Solution 1 to 50   Page " align="center">
                <template slot-scope="scope">
                    <span v-html="setkey(scope.row.fline)"></span>
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
            <input class="pagenum" v-model="showp" placeholder="" />
            <div class="buttondark" style="cursor: pointer;width: 30%;margin-left: 18%;margin-right: 1%;"
                @click="change">
                {{ order }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ["longtext", "resindexnum", "indexnum", "currentPageData"],
    // "longtext":要高亮的词
    // "total"：总共的索引数
    // "indexnum"：索引条数，要展示在表格第三列的表头,每一页显示条数
    // "currentPageData"：表格的数据
    data() {
        return {

            pageSize: 1, // 统共页数，默认为1
            currentPage: 1, //当前页数 ，默认为1

            // currentPageData: [], //当前页显示内容
            headPage: 1,
            showp: '',
            order: 'Random Order',
            orderway: 1,//1表示Show Corpus；2表示Random Order
            // title: "五百年前孙悟空大闹天宫",
            // searchWord: "孙悟空",
        }
    },

    mounted() {
        // this.getCurrentPageData();

        this.p();//计算表格共多少页
        console.log(this.pageSize)
    },
    methods: {
        p() {
            this.pageSize = Math.ceil(this.resindexnum / this.indexnum);
        },
        getCurrentPageData() {
            this.$axios.request({
                method: 'GET',
                url: "/api/corpus/article",
                params: {
                    'word': this.longtext,// 检索内容                       
                    'max_num': this.indexnum,// 一页展示的索引条数
                    'current_page': this.currentPage,
                }

            }).then((res) => {
                this.$message({
                    showClose: true,
                    message: '开始检索……',
                    type: 'success'
                });
                // eslint-disable-next-line
                this.currentPageData = res.data.data


            })

        },
        //首页
        firstpage() {
            this.currentPage = this.headPage;
            this.getCurrentPageData();
        },
        //上一页
        prevPage() {
            if (this.currentPage == 1) {
                return false;
            } else {
                this.currentPage--;
                this.getCurrentPageData();
            }
        },
        // 下一页
        nextPage() {
            console.log("下一页")
            if (this.currentPage == this.pageSize) {
                return false;
            } else {
                this.currentPage++;
                this.getCurrentPageData();
            }
        },
        //尾页
        lastPage() {
            if (this.currentPage == this.pageSize) {
                return false;
            } else {
                this.currentPage = this.pageSize;
                this.getCurrentPageData();
            }

        },
        showpage() {
            this.currentPage = this.showp;
            this.getCurrentPageData();
            console.log(this.showp)
        },
        change() {
            if (this.order == 'Show Corpus') {
                this.order = 'Random Order';
                this.orderway = 1;//Show Corpus
                this.getCurrentPageData();
            }
            else {
                this.order = 'Show Corpus';
                this.orderway = 2;//Show Corpus
                this.getCurrentPageData();
            }
        },

        setkey(line) {
            if (line.includes(this.longtext)) {
                line = line.replace(
                    this.longtext,
                    // 这里是替换成html格式的数据，最好再加一个样式权重，保险一点
                    '<font style="color:rgba(47, 85, 151, 1)!important;">' + this.longtext + '</font>'

                )
                return line
            }
            // 不包含的话还用这个
            else {
                return line
            }
        },
        rowclick(row) {
            console.log(row.id)
            this.$emit('jump', row.fpar)
        }
    },
}
</script>

<style>
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
    width: 1.8rem;
    margin-top: 0.5rem;
    margin-left: 0.8rem;
    font-size: 1.8rem;
    height: 1.8rem;
    text-align: center;
    border: 0.1rem solid black;
}
</style>
