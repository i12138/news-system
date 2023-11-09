<template>
    <!-- <el-form :model="user" label-width="100px">
        <el-form-item label="用户名">
            <el-input v-model="user.userNickname" :disabled="false" />
        </el-form-item>

       
    </el-form> -->
    <el-form ref="form" :model="user" label-width="140px">
        <el-form-item label="活动名称">
            <el-input v-model="user.userNickname" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="账号">
            <el-input v-model="user.userAccount" disabled="false" />
        </el-form-item>
        <el-form-item label="Emil">
            <el-input v-model="user.userEmail" disabled="false" />
        </el-form-item>
    </el-form>
</template>
<script>
import { getToken } from "@/utils/setToken"
import { findUserById, login } from "@/api/index"
export default {
    data() {
        return {
            userId: getToken("userId"),
            user: {},
        }
    },
    created() {
        this.queryUser()
    },
    methods: {
        queryUser() {
            findUserById(this.userId).then(res => {
                if (res.data.code === 200) {
                    this.user = res.data.data
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form {
    .el-form-item {
        .el-input {
            width: 70%;
        }
    }
}
</style>