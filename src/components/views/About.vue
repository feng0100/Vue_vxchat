<template>
    <div class='panel_about'>
        <div class='about_head'>关于</div>
        <ul class="about_list">
            <li>
                <span class="list_lable">版本: </span>
                <span class="list_text">v1.0</span>
            </li>
            <li>
                <span class="list_lable">协议: </span>
                <span class="list_text">MIT</span>
            </li>
            <li>
                <span class="list_lable">作者: </span>
                <span class="list_text">xxx</span>
            </li>
            <li>
                <span class="list_lable">邮箱: </span>
                <span class="list_text">xxx</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>
    @import "../../assets/global/global.css";
    /* 关于面板 */
    .panel_about{
        width: 100%;
        height: 100%;
        padding: 0 15px;
        position: relative;
    }
    .about_head{
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(79, 82, 87);
    }
    .about_list{
        list-style: none;
        padding: 0;
        margin: 15px 0 0;
    }
    .about_list li{
        line-height: 36px;
        vertical-align: middle;
        border-bottom: 1px dotted #d1d1d1;
        padding: 0 10px;
        font-size: 12px;
        color: #606266;
    }
    .about_list li .list_lable{
        font-size: 14px;
        color: #3a3c3e;
        margin-right: 12px;
    }
</style>