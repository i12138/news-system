<template>
    <div class="query">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input class="input" v-model="formInline.newsTitle" placeholder="标题" clearable />
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker class="input" v-model="formInline.startDate" type="date" placeholder="起始日期" clearable />
            </el-form-item>
            <el-form-item label="到">
                <el-date-picker class="input" v-model="formInline.endDate" type="date" placeholder="结束日期" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findByParams">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in newsData" :key="item.newsId" @click="getDetailNews(item)">
            <!-- 内容 -->
            <div class="news">
                <div style="margin-top: 10px;"> <el-text class="title" truncated>{{ item.newsTitle }} </el-text></div>
                <div><el-text tag="i">{{ formatDate(item.releaseDate) }}</el-text></div>
                <div> <el-text line-clamp="14">{{ item.newsContent }}</el-text></div>
            </div>
        </el-carousel-item>
    </el-carousel>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false" :disabled="false"
            :background="false" layout="prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script>
import { newsList, deleteNews, getNewsById, updateNews } from "@/api/index"
export default {
    data() {
        return {
            formInline: {
                newsTitle: "",
                startDate: "",
                endDate: ""
            },
            newsData: [],
            currentPage: 1,
            pageSize: 6,
            total: 0
        }
    },
    created() {
        this.getNewsList({ size: this.pageSize, current: this.currentPage })
    },
    methods: {
        getDetailNews(params) {
            console.log(params)
        },
        getNewsList(params) {
            newsList(params).then(res => {
                this.newsData = res.data.data.records
                this.total = parseInt(res.data.data.total)
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getNewsList({
                newsTitle: this.formInline.newsTitle,
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                size: this.pageSize,
                current: this.currentPage
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getNewsList({
                newsTitle: this.formInline.newsTitle,
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                size: this.pageSize,
                current: this.currentPage
            })
        },
        findByParams() {
            this.getNewsList({
                newsTitle: this.formInline.newsTitle,
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                size: this.pageSize,
                current: this.currentPage
            })
        },
        reset() {
            this.formInline = {}
            this.pageSize = 6
            this.currentPage = 1
            this.getNewsList({ size: this.pageSize, current: this.currentPage })
        },
    },
    computed: {
        formatDate() {
            return function (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var date = date.getDate();
                return year + "-" + month.toString().padStart(2, '0') + "-" + date.toString().padStart(2, '0')
            }
        }
    }
}
</script>
<style lang="scss">
//分页
.demo-pagination-block {
    display: flex;
    margin-top: 20px;
    text-align: center;

    .el-pagination {
        margin: 0 auto;
    }
}

//走马灯
.news {
    div {
        text-align: center;
        width: 700px;
        margin: auto;
    }
}

.el-carousel__item {
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #f4f4f5;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #ecf5ff;
}
</style>
