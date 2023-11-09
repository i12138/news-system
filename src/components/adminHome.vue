<template>
    <div class="home">
        <div>
            <Header />
        </div>
        <el-container class="content">
            <Mean class="mean" />
            <el-container>
                <el-main>
                    <div>
                        <Bread />
                    </div>
                    <div class="cont">
                        <router-view></router-view>
                    </div>
                </el-main>
                <el-footer class="footer">
                    <Footer class="foo" />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Header from "@/components/common/Header.vue"
import Mean from "@/components/common/Mean.vue"
import Footer from "@/components/common/Footer.vue"
import Bread from "@/components/common/Breadcrumb.vue"
export default {
    components: {
        Header,
        Footer,
        Mean,
        Bread
    },
    data() {
        return {

        }
    },

}
</script>
<style lang="scss" scoped>
.home {
    height: 100%;
    width: 100%;

    .content {
        position: absolute;
        width: 100%;
        top: 72px;
        bottom: 0px;
        // margin-top: 30px;

        .el-container {
            display: flax;
        }

        .cont {
            margin: 20px 0px;
        }

        .mean {
            display: flex;

        }
    }

    .footer {
        padding: 0px;
    }
}
</style>