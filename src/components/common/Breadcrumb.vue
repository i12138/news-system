<template>
    <div>
        <el-card>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>首页</el-breadcrumb-item> -->
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>