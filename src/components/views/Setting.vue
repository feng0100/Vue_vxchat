<template>
    <div class='panel_set'>
        <div class='set_head'>设置</div>
        <div class='set_userinfo'>
            <div class='set_userinfo_avatar'>
                <img src="" alt="">
            </div>
            <div class='set_userinfo_details'>
                <div class='details_name'>用户名</div>
                <div class='details_device'>
                    <i class="iconfont icon-diannao"></i>
                    电脑</div>
                <div class='details_time'>时间</div>
            </div>
        </div>
        <ul class="set_list">
            <li class="set_list_item" @click="tip">
                <input id="tipmp3" type="checkbox" >
                <span>消息音效</span>
            </li>
            <li class="set_list_item">
                <input type="checkbox" checked="checked">
                <span>显示昵称</span>
            </li>
            <li class="set_list_item">
                <input type="checkbox" checked="checked">
                <span>消息时间</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        methods:{
            tip(){
               let mp3 = document.getElementById('tipmp3')
                    this.$socket.tip = mp3.checked
            },
            sockets: {
                connect: function () {  //这里是监听connect事件
                    this.id = this.$socket.id
                    this.$socket.tip = false
                },
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/iconfont/iconfont.css";
    @import "../../assets/global/global.css";
    /* 设置面板 */
    .panel_set{
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0 15px;
    }
    .set_head{
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(79, 82, 87);
    }
    .set_userinfo_avatar{
        width: 60px;
        height: 60px;
        border-radius: 4px;
        float: left;
        background-color: lightsteelblue;
    }
    .set_userinfo_details{
        margin-left: 70px;
        font-size: 14px;
    }
    .details_name{
        color: #26292e;
    }
    .details_device{
        margin-top: 6px;
        font-size: 12px;
        color:lightslategray;
    }
    .details_time{
        font-size: 12px;
        color: #606266;
    }
    /* 设置选项 */
    .set_list{
        list-style: none;
        padding: 0;
        margin: 15px 0 0;
    }
    .set_list li{
        line-height: 36px;
        vertical-align: middle;
        border-bottom: 1px dotted #d1d1d1;
        padding: 0 10px;
        font-size: 14px;
        color: #606266;
    }
    .set_list li input[type='checkbox']{
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 0 10px 0 0;
        padding: 0;
        border-radius: 2px;
        vertical-align: middle;
    }
</style>