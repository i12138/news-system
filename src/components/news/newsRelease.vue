<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="ruleForm.title" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
            <el-col :span="11">
                <el-form-item prop="date">
                    <el-date-picker type="date" :disabled="true" placeholder="选择日期" v-model="ruleForm.date"
                        style="width: 300px;"></el-date-picker>
                </el-form-item>
            </el-col>

        </el-form-item>
        <el-form-item label="作者">
            <span>{{ author }}</span>
        </el-form-item>


        <el-form-item label="内容" prop="content">
            <el-input placeholder="请输入内容" type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { addNews } from "@/api/index"
import { getToken } from "@/utils/setToken"
export default {
    data() {
        return {
            author: getToken("userNickname"),
            ruleForm: {
                title: '',
                date: new Date(),
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' },
                    { min: 3, max: 35, message: '长度在 1 到 35 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addNews({
                        userId: getToken("userId") + "",
                        newsTitle: this.ruleForm.title,
                        releaseDate: this.ruleForm.date,
                        newsContent: this.ruleForm.content
                    }).then(res => {
                        if (res.data.code === 200) {
                            this.$message({ message: "发布成功", type: 'success' })
                            this.ruleForm = { date: new Date() }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.el-textarea {

    :deep(.el-textarea__inner) {
        height: 238px;
        width: 600px;
    }
}
</style>