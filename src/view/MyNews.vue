<template>
    <div style="width: 76.8rem;margin: auto; border: 1px solid #e5e5e5;">
        <my-header></my-header>
        <my-image></my-image>
        <div class="mian">
            <div class="column-path">
                <span style="cursor:pointer" @click="$router.push('/Main')">&nbsp;&nbsp;首页&nbsp;&nbsp;</span>
                <span class="possplit">&nbsp;&nbsp;</span>
                <span style="cursor:pointer" @click="$router.push({ path: '/detail', query: { part_id: part_id } })">
                    &nbsp;{{ list[part_id] }}</span>
            </div>
            <div id="article">
                <!-- 文章标题 -->
                <h1 id="title">{{ news.title }}</h1>
                <!-- 文章信息 -->
                <p id="meta">
                    <span id="time">时间：{{ news.time }}</span>
                    <span id="author">作者：{{ news.author }}</span>
                    <span id="sources">文章来源{{ news.source }}</span>
                    <span id="views">浏览：{{ news.viewed }}</span>
                </p>
                <!-- 文章内容 -->
                <div class="entry">
                    <div v-text="news.text" id="text"></div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    created() {
        this.getnews()
    },
    data() {
        return {
            list: ["课程交流", "学术交流", "团队风采", "语料库"],
            part_id: '',
            news_id: '',
            news: {
                title: "外国语学院党委中心组和学生代表集体收看 学习党的二十大开幕会",
                time: "2022-10-17",
                author: "辛海东",
                source: "外国语学院",
                viewed: "38",
                text: " 2022年4月20日，外国语学院分党委组织开展党的创新理论学习“943”工作法专题培训，会议采取线上形式，分党委书记赵欣主持，各党支部书记参加。\n     会议针对校党委第二巡察组反馈意见指出的政治理论学习与业务能力提升相融合不够等有关问题，结合落实学院党委制定的“党的创新理论学习‘943’工作法”，进行了专题培训。 “943”工作法中“9”是指开展党的创新理论学习的主要做法，包括“常态自学+提前谋划+人人主持+主题发言+重点领学+集体讨论+融合教学+严格程序+会后总结”9个环节；“4”是指可以从“提高站位+扩大视野+统一思想+落实落细”四个方面来总结活动成效；“3”是指可以围绕“多用心+多用情+多用力”三个维度去凝练经验启示。会议指出，加强党的创新理论学习是党支部强化政治功能的基础性工作，也是严肃党内政治生活的重要手段。会议强调，学院在总结近年来实践探索经验的基础上，制定“党的创新理论学习‘943’工作法”，旨在提高“结构化学习”质量，增强“精准运用”效果，使党员教职工既能“知其然、知其所以然”，又能结合业务工作把所学理论知识“讲清楚、说明白”，将学习成效转化为推动学院高质量发展的工作动力。"
            },
        }

    },
    methods: {
        getnews() {
            this.part_id = this.$route.query.part_id;
            this.news_id = this.$route.query.news_id;
            // this.$axios.request({
            //     method: 'GET',
            //     url: 'http://192.168.1.4:8100/api/corpus/test',
            //     params: {
            //         word: 'B',
            //     }
            // }).then((res) => {
            //     // console.log(res),
            //     this.news = res.data.detail;
            //     console.log(res.data.detail);
            // })
        }
    }
}
</script>

<style scoped>
.column-path {
    margin-top: 0.786rem;
    height: 1.965rem;
    line-height: 1.965rem;
    font-size: smaller;
    border-bottom: 1px solid #ededed;
}

.possplit {
    background: url(@/assets/images/posSplit.gif) no-repeat;
    text-indent: 22px;
    background-position: center;
    width: 10px;
    display: inline-block;
}

#article {
    width: 57.6rem;
    margin: auto;
}

#title {
    width: 48rem;
    /* 让标题的宽度比内容宽度小一点 */
    line-height: 30px;
    padding: 30px;
    margin: 0.393rem auto;
    text-align: center;
    font-size: 30px;
    font-weight: normal;
    color: #202976;
    /* border-bottom: 0px solid #ECECEC; */
}

#meta {
    /* 居中显示 */
    height: 16px;
    line-height: 16px;
    text-align: center;
    padding: 10px 0;
    margin-top: 0;
    background: #ededed;
}

#meta span {
    display: inline-block;
    margin: 0 5px;
    font-size: 14px;
    color: #000;
}

#text {
    white-space: pre-wrap;
    font-size: 16px;
    font-family: "Microsoft Yahei" !important;
    color: #303030;
    line-height: 1.6 !important;
    /* padding: 10px; */
    /* background:white; */
}
</style>