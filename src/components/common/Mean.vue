<template>
    <div class="mean">
        <el-aside width="200px">
            <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff">
                <template v-for="(item, index) in menus" :key="index">
                    <el-sub-menu :index="index + ''" v-if="!item.hidden">
                        <template #title>
                            <el-icon>
                                <component :is="item.iconClass" />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item-group v-for="(child, index) in item.children" :key="index">
                            <el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-aside>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menus: []
        }
    },
    created() {
        this.menus = [...this.$router.options.routes]
    }

}
</script>
<style lang="scss">
.mean {

    .el-aside {
        height: 100%;

        .el-menu {
            height: 100%;
            // margin-top: 25px;
        }

        .el-sub-menu .el-menu-item-group {
            min-width: 0px;
        }
    }
}
</style>