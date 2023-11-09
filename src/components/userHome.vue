<template>
    <div class="home">
        <div>
            <Header />
        </div>
        <el-container class="content">
            <el-container>
                <el-main>
                    <div class="cont">
                        <Cont />
                    </div>
                </el-main>
                <el-footer class="footer">
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Header from "@/components/common/user/Header.vue"
import Cont from "../views/user/index.vue"
export default {
    components: {
        Header,
        Cont
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