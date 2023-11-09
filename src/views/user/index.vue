<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">
                <el-space direction="vertical">
                    <el-text>span</el-text>
                    <el-text tag="p">This is a paragraph.</el-text>
                    <el-text tag="b">Bold</el-text>
                    <el-text tag="i">Italic</el-text>
                    <el-text>
                        This is
                        <el-text tag="sub" size="small">subscript</el-text>
                    </el-text>
                    <el-text>
                        This is
                        <el-text tag="sup" size="small">superscript</el-text>
                    </el-text>
                    <el-text tag="ins">Inserted</el-text>
                    <el-text tag="del">Deleted</el-text>
                    <el-text tag="mark">Marked</el-text>
                </el-space>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">1</div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">1</div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">1</div>
        </el-col>
    </el-row>
</template>

<style lang="scss">
.el-row {
    margin-bottom: 20px;

    .el-col {
        border-radius: 4px;

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
            margin-top: 10px;
            border: 1px solid black;
        }
    }

}

.el-row:last-child {
    margin-bottom: 0;
}
</style>
