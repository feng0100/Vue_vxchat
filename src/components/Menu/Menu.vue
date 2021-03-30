<template>
    <div class='home_menu'>
        <div class='menu_avatar'><img :src=myavatar alt=""></div>
        <ul class="menu_list">
            <li class="iconfont icon-liaotian"  @click="urlchange('/Home/Chatting')"></li>
            <!--多人群聊 <li class="iconfont icon-duorenhuiyi"></li> -->
            <li class="iconfont icon-hanhan-01-01" @click="urlchange('/Home/Setting')"></li>
            <li class="iconfont icon-iconset0103"  @click="urlchange('/Home/About')"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data(){
            return {
                myavatar:this.$socket.avatar
            }
        },
        methods:{
            urlchange(path){
                this.$router.replace(path)
            }
        },
        sockets:{
            connect: function(){  //这里是监听connect事件
                this.id=this.$socket.id
            },
        },
    }
</script>
<style scoped>
    @import "../../assets/iconfont/iconfont.css";
    @import "../../assets/global/global.css";
    .home_menu{
        width: 60px;
        height: 100%;
        float: left;
        position: relative;
        background-color: #26292e;
    }
    .menu_avatar{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        position: relative;
        padding: 10px;
    }
    .menu_avatar img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color:lightblue ;
    }
    .menu_list{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .menu_list li{
        text-align: center;
        line-height: 40px;
        font-size: 22px;
        color: #f2f2f2;
        cursor: pointer;
    }
</style>