<template>
    <div class="login">
        <div class='alertbox'>
            登录失败，用户名已存在！
        </div>
        <div class='login_top'></div>
        <div class='login_bottom'>
            <div class='login_bottom_content'>
                <div class='login_bottom_mine'>
                    <div class='login_avatar'>
                        <img src="/img/avatar05.cdc4fbbe.jpg" class="avatar_img" @click="openslect">
                        <div class='login_avatar_select'>
                            <div class='avatar_select_in'>
                                <input placeholder="请输入QQ号码" type="text" class="avatar_input">
                            </div>
                            <ul class="avatar_select_list" >
                                <li v-for="(item,index) in avatarurl" :key="index"><img :src="require('../../assets/img/avatar/'+item)" @click="selectthisimg(index)"></li>
                            </ul>
                        </div>
                    </div>
                    <div class='login_info'>
                        <input class="info_input info_name" type="text" placeholder='用户名'>
                        <input class="info_input info_psw" type="password" placeholder='密码'>
                    </div>
                </div>

                <button class="login_btn" @click="urlchange">登录</button>
            </div>
        </div>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
    import $ from 'jquery'
    export default {
        name: "Login",
        data(){
          return{
              avatarurl:[],
              userinfo: {name:'',psw:'',socketID:'',prichattime:'',texthistory:'',myavatar:'/img/avatar05.cdc4fbbe.jpg',msgdata:[]}
          }
        },
        methods:{
            urlchange(){
                let info_name = document.getElementsByClassName('info_name')[0]
                let info_psw = document.getElementsByClassName('info_psw')[0]
                this.userinfo.name = info_name.value.trim()
                this.userinfo.psw = info_psw.value
                this.userinfo.socketID = this.$socket.id
                // 判断是不是已经有这个用户名的客户端在运行
                if (this.userinfo.name != ''){

                    this.$socket.emit('onlineuser',this.userinfo,(re)=>{
                        // 如果没有再让这个用户进行登录
                        if (re){
                            // 把用户的信息保存到socket里
                            this.$socket.userName = this.userinfo.name
                            this.$socket.avatar = this.userinfo.myavatar
                            // console.log(this.userinfo)
                            this.$socket.emit('userinfo',this.userinfo)
                            this.$router.replace('/home/Chatting')
                        }else{
                            this.alertwindow('登录失败，用户名已存在！')
                        }
                    })
                }else{
                    this.alertwindow('登录失败，用户名不能为空')
                }
            },
            openslect(){
                $('.login_avatar_select').slideToggle()
            },
            selectthisimg(index){
                let url = this.avatarurl[index]
                $('.avatar_img').attr('src',require('../../assets/img/avatar/'+url))
                // 把头像的url 放入userinfo中
                this.userinfo.myavatar = require('../../assets/img/avatar/'+url)
            },
            alertwindow(text){
                $('.alertbox').clearQueue() // 清除事件队列
                $('.alertbox').text(text)
                $('.alertbox').animate({
                    top:'40px',
                    opacity:'0.8'
                }).animate({
                    top:'-50px',
                    opacity:'0.4'
                },2500)
            },
        },
        created() {
            //一定要移除旧的message监听，否则会出现重复监听的状况
            this.$socket.removeAllListeners();
        },
        // 为什么在生命周期用 this.$socket.on 监听不到事件 却可以发送事件 ？？
        sockets:{
            connect: function(){  //这里是监听connect事件
                this.id=this.$socket.id
            },
            avatarimgurl: function (url) {
                this.avatarurl = url
            }
        }
    }

</script>


<style scoped>
    @import "../../assets/iconfont/iconfont.css";
    .alertbox{
        left: 50%;
        top: -50px;
        z-index: 999;
        position: fixed;
        color: #f2f2f2;
        font-size: 14px;
        line-height: 20px;
        border-radius: 4px;
        padding: 15px 20px 15px 29px;
        transform: translateX(-50%);
        background-color: rgba(51, 51, 51, 0.8);
    }
    .login{
        width: 360px;
        height: 278px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        position: absolute;
    }
    .login_top{
        background-color: #f5f5f5;
        background-image: url("../../assets/img/LoginBackimg.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        overflow: auto;
        height: 140px;
        border-radius: 4px 4px 0 0;

    }
    .login_bottom{
        text-align: center;
        background-color: #ffffff;
        padding: 20px 30px;
        border-radius: 0 0 4px 4px;
    }
    .login_bottom_content{
        width: 260px;
        height: 100px;
        /* border: #67c23a 1px solid; */
        margin: auto;
        margin-top: 14px;
        display: flex;
        flex-direction: column;
    }
    .login_bottom_mine{
        display: flex;
        align-items: center;
    }
    .login_avatar{
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        margin-right: 10px;
        border-radius: 4px;
        position: relative;
    }
    .login_avatar>img{
        width: 60px;
        height: 60px;
        border-radius: 4px;
    }
    .login_avatar_select{
        display: none;
        position: absolute;
        background-color: #ffffff;
        width: 320px;
        border-radius: 4px;
        top: 100%;
        left: -40px;
        border: 1px solid #d1d1d1;
        margin-top: 15px;
        z-index: 999;
    }
    .login_avatar_select:after{
        display: block;
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        bottom: 100%;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ffffff;
        left: 40px;
        z-index: 99;
        margin-bottom: -1px;
    }

    .login_avatar_select:before{
        display: block;
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        bottom: 100%;
        left: 40px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        z-index: 99;
        border-bottom: 10px solid #d1d1d1;
        margin-bottom: 0;
    }
    .avatar_select_in{

        margin: 0 15px;
        padding-top: 15px;
        border-radius: 4px;
        position: relative;
    }
    .avatar_select_in .avatar_input{
        display: block;
        line-height: 30px;
        border: 1px solid #d1d1d1;
        color: #3a3c3e;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
        outline: none;
        width: 100%;
        border-radius: 4px;
    }
    .avatar_select_list{
        list-style: none;
        margin: 0;
        padding: 10px;
    }
    .avatar_select_list li{
        float: left;
        width: 50px;
        height: 50px;
        margin: 5px;
        box-sizing: border-box;
        position: relative;
        border: 2px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
    }
    .avatar_select_list li>img{
        width: 50px;
        height: 50px;
    }
    .login_info .info_input{
        display: block;
        width: 100%;
        height: 30px;
        outline: none;
        border: 1px solid #d1d1d1;
        /* margin: -1px; */
        padding: 0 10px;
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
    }
    .login_info .info_input:focus{
        /* border-color:red green blue; */
        border-color:#3a8ee6;
    }
    .info_input.info_name{
        border-radius: 4px 4px 0 0;
        margin-bottom: -1px;
    }
    .info_input.info_psw{
        border-radius: 0 0 4px 4px;

    }
    .info_input.info_psw:focus{
        border-color: #d1d1d1 #3a8ee6  #3a8ee6  #3a8ee6;
    }

    .login_btn{
        display: block;
        width: 100%;
        line-height: 30px;
        font-size: 14px;
        border: none;
        margin: auto;
        color: #f2f2f2;
        background-color: #3a8ee6;
        border-radius: 4px;
        margin-top: 7px;
        outline: none;
    }
</style>