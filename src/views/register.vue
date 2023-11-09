<template>
    <div class="register-body">
        <div class="register-panel">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form">
                <div class="login-title">用户注册</div>
                <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button class="button" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import { register } from '@/api/index'
export default {

    data() {
        return {
            ruleForm: {
                password: '',
                account: '',
                nickname: '',
                email: ''
            },
            rules: {
                account: [{
                    required: true,
                    message: "请输入用户名",
                    // trigger: "blur",
                }],
                password: [{
                    required: true,
                    message: "请输入密码",
                    // trigger: "blur",
                }]
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    register({
                        userNickname: this.ruleForm.nickname,
                        userAccount: this.ruleForm.account,
                        userEmail: this.ruleForm.email,
                        userPwd: this.ruleForm.password
                    }).then(res => {
                        if (res.data.code === 200) {
                            this.$message({ message: "注册成功", type: 'success' })
                            this.$router.push("/")
                        }
                    })
                } else {
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
.register-body {
    display: flex;
    width: 100%;
    height: calc(100vh);
    background-size: cover;
    background-position: center;
    background-image: url(../assets/login.jpg);

    .register-panel {
        padding: 20px 20px 20px 0px;
        margin: auto;
        width: 350px;
        background-color: aliceblue;
        opacity: 0.9;
        border-radius: 5px;
        box-shadow: 2px 2px 10px #ddd;

        .login-title {
            margin-bottom: 10px;
            text-align: center;
            font-size: 20px;
        }

        .form {
            margin-left: -11px;
            padding-left: 0px;
            width: 300px;
        }

        .button {
            margin: 0 auto;
        }

    }
}
</style>