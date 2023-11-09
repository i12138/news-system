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
    <el-table :data="tableData" :border="true" style="width: 100%">
        <el-table-column :show-overflow-tooltip='true' prop="newsTitle" align="center" label="标题" />
        <el-table-column prop="newsContent" align="center" label="内容">
            <template v-slot="scope">
                <el-text class="w-150px mb-2" truncated>
                    {{ scope.row.newsContent }}
                </el-text>
            </template>
        </el-table-column>
        <el-table-column prop="releaseDate" align="center" label="发布日期" :formatter="formatDate" />
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <el-button type="primary" @click="showNews(scope.row.newsId)" :icon="Operation" />
                <el-button type="primary" @click="edit(scope.row.newsId)" :icon="Edit" />
                <el-button type="danger" @click="del(scope.row.newsId)" :icon="Delete" />
            </template>

        </el-table-column>
    </el-table>
    <div class="pages">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 10, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
    <el-dialog width="30%" v-model="dialogFormVisible" title="编辑新闻" center>
        <el-form :model="news">
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="news.newsTitle" autocomplete="off" />
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
                <el-input v-model="news.newsContent" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    autocomplete="off" placeholder="Please input" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="update">
                    更新
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-drawer :direction="direction" v-model="drawer" title="I am the title" :with-header="false">
        <div>新闻标题：{{ news.newsTitle }}</div>
        <div>
            <span>作者：{{ news.releaseUser }}</span>
            <span>发布时间：{{ news.releaseDate }}</span>
        </div>

        <div>
            <span>内容：</span>
            {{ news.newsContent }}
        </div>

    </el-drawer>
</template>
<script>
import { newsList, deleteNews, getNewsById, updateNews } from "@/api/index"
import moment from 'moment'
export default {
    data() {
        return {
            formInline: {
                newsTitle: "",
                startDate: "",
                endDate: ""
            },
            tableData: [],
            news: {
                // newsTitle: "",
                // releaseUser: "",
                // releaseDate: "",
                // newsContent: ""
            },
            direction: 'ltr',
            drawer: false,
            dialogFormVisible: false,
            formLabelWidth: '40px',
            currentPage: 1,
            pageSize: 6,
            total: 0
        }

    },
    filters: {
        formatDate(value) {
            if (value) {
                const date = new Date(value);
                return date.toLocaleDateString(); // 将日期转换为所需格式
            }
        }
    },
    created() {
        this.getData({ size: this.pageSize, current: this.currentPage })
    },
    methods: {
        showNews(newsId) {
            this.drawer = true
            this.getNewsInfo(newsId)
        },
        update() {
            updateNews({
                newsId: this.news.newsId,
                newsTitle: this.news.newsTitle,
                newsContent: this.news.newsContent
            }).then(res => {
                if (res.data.code === 200) {
                    this.dialogFormVisible = false
                    this.getData({ size: this.pageSize })
                    this.$message({ message: "修改成功", type: 'success' })
                }
            })
        },
        edit(newsId) {
            this.dialogFormVisible = true
            this.getNewsInfo(newsId)
        },
        getNewsInfo(newsId) {
            getNewsById(newsId).then(res => {
                this.news = res.data.data
                this.news.releaseDate = moment(this.news.releaseDate).format('YYYY-MM-DD')
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getData({
                newsTitle: this.formInline.newsTitle,
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                size: this.pageSize,
                current: this.currentPage
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData({
                newsTitle: this.formInline.newsTitle,
                startDate: this.formInline.startDate,
                endDate: this.formInline.endDate,
                size: this.pageSize,
                current: this.currentPage
            })
        },
        getData(params) {
            newsList(params).then(res => {
                this.tableData = res.data.data.records
                this.total = parseInt(res.data.data.total)
            }).catch(err => {
                throw err
            })
        },
        del(newsId) {
            deleteNews(newsId).then(res => {
                if (res.data.code === 200) {
                    this.$message({ message: "删除成功", type: 'success' })
                    this.getData({ size: this.pageSize, current: this.currentPage })
                } else {
                    this.$message({ message: "删除失败", type: 'error' })
                }
            }).catch(err => {
                throw err
            })
        },
        findByParams() {
            this.getData({
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
            this.getData({ size: this.pageSize, current: this.currentPage })
        },
        //时间格式化
        formatDate(row, column) {
            // 获取单元格数据
            let datac = row[column.property];
            let dtc = new Date(datac)
            //获取月,默认月份从0开始
            let dtuMonth = dtc.getMonth() + 1
            //获取日
            let dtuDay = dtc.getDate()
            //处理1-9月前面加0
            if (dtuMonth < 10) {
                dtuMonth = "0" + (dtc.getMonth() + 1)
            }
            //处理1-9天前面加0
            if (dtuDay < 10) {
                dtuDay = "0" + dtc.getDate()
            }
            //获取小时
            let dtuHours = dtc.getHours()
            //处理1-9时前面加0
            if (dtuHours < 10) {
                dtuHours = "0" + dtc.getHours()
            }
            //获取分钟
            let dtuMinutes = dtc.getMinutes()
            //处理1-9分前面加0
            if (dtuMinutes < 10) {
                dtuMinutes = "0" + dtc.getMinutes()
            }
            //获取秒
            let dtuSeconds = dtc.getSeconds()
            //处理1-9秒前面加0
            if (dtuSeconds < 10) {
                dtuSeconds = "0" + dtc.getSeconds()
            }
            //组装年月日时分秒,按自己的要求来
            let dd = dtc.getFullYear() + "/" + dtuMonth + "/" + dtuDay;
            return row.TableIsbibei = dd;
            //+ " " + dtuHours + ":" + dtuMinutes + ":" + dtuSeconds
        }
    }
}
</script>
<script  setup>
import { Check, Delete, Edit, Message, Search, Star, Operation } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
//显示新闻详细信息样式
.el-drawer {
    div {
        margin-top: 10px;

        span {
            display: flex;
            justify-content: left
        }
    }
}

.el-pagination {
    margin: auto auto;
}

.el-table {

    .el-table-column {
        height: 30px !important;
    }
}

.pages {
    display: flex;
    margin-top: 15px;

    .page-sizes {
        width: 100px;
        text-align: center;
    }
}

.demo-form-inline {
    .input {
        text-align: left;
        width: 210px;
    }
}


.el-dialog {
    display: flex;
    align-items: center;
    justify-content: space-around !important;

    .el-form {
        padding: 10px 20px;
    }

    .dialog-footer {
        display: flex;
        width: 100%;
        margin: -40px 0 0 0;
        padding: 0px;

        .el-button {
            margin: 0 auto;
        }
    }
}
</style>
<style>
.dialog-footer button:first-child {
    /* margin-right: 10px; */
    margin: auto auto;
}
</style>