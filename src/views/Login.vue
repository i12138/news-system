<template>
    <div class="login-body">
        <div class="login-panel">
            <el-form :model="formData" ref="formData" :rules="rules">
                <div class="login-title">用户登录</div>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formData.account" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" />
                </el-form-item>
                <el-form-item label="">
                    <el-button class="login" @click="login('formData')" type="primary">登录</el-button>
                    <el-button class="register" @click="register()" type="primary">注册</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script>
import { setToken } from "@/utils/setToken"
import { login } from "@/api/index"
export default {
    data() {
        return {
            formData: {
                account: "",
                password: "",
            },
            rules: {
                account: [{
                    required: true,
                    message: "请输入账号",
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
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login({
                        userAccount: this.formData.account,
                        userPwd: this.formData.password
                    }).then(res => {
                        console.log(res)
                        if (res.data.code === 200) {

                            setToken('userNickname', res.data.data.userNickname)
                            setToken('userId', res.data.data.userId)
                            this.$message({ message: "登录成功", type: 'success' })
                            this.$router.push("/home")
                        }

                    })


                } else {
                    return false;
                }
            });
        },
        register() {
            this.$router.push("/register")
        }
    }
};
</script>

<style lang="scss" scoped>
.login-body {
    display: flex;
    width: 100%;
    height: calc(100vh);
    background-size: cover;
    background-position: center;
    background-image: url(../assets/login.jpg);

    .login-panel {
        padding: 20px;
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

        .check-code-panel {
            display: flex;
            align-items: center;

            .input-panel {
                flex: 1;
                margin-right: 5px;
            }

            .check-code {
                height: 30px;
                cursor: pointer;
            }
        }

        .login {
            margin: 0 auto;
        }

        .register {
            margin: 0 auto;
        }
    }
}
</style>
