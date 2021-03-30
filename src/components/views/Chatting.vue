<template>
    <div class='panel_chat' >
        <div class='chat_user'>
            <div class='user_search'>
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="搜索" class="search_input">
            </div>
            <div class='user_list'>
                <div class='user_list_container scroll'>
<!--                    对话人（群）-->
                    <div class='user_item' @click="showchating(0)">
                        <img src="../../assets/img/qunliao.jpg" alt="" class="user_item_avatar">
                        <div class='user_item_info'>
                            <div class='info_left'>
                                <span class="user_item_name">群聊</span>
                                <span class="user_item_history">{{allpeoplehistory}}</span>
                            </div>
                            <div class='info_right'><span class="user_item_tiem">{{allchattime}}</span></div>
                            <span class="user-item-num" style="display: none">1</span>
                        </div>
<!--                        <span class="user-item-num" v-if="num>0">{{num>99?'99+':num}}</span>-->
                    </div>
                    <div class='user_item' v-for="(item,index) in ortheruserArr(userArr)"  :key="index" @click="showchating(index+1)">
                        <img :src=item.myavatar  class="user_item_avatar">
                        <div class='user_item_info'>
                            <div class='info_left'>
                                <span class="user_item_name">{{item.name}}</span>
                                <span class="user_item_history">{{item.texthistory}}</span>
                            </div>
                            <div class='info_right'><span class="user_item_tiem">{{item.prichattime}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat_chating" v-for="(item,index) in UserArr" :key="index">
            <div class='chating_head'>
                <img :src=item.myavatar alt="" class="chating_head_avatar">
                <span class="chating_head_name" id="chatname">{{item.name}}</span>
                <i class="chating_head_device iconfont icon-diannao"></i>
            </div>
<!--            聊天信息框-->
                <div class="chating_msg" >
                    <div class='chating_msg_list scroll'>
                        <message id="msg">
                            开始给 {{item.name}} 发送信息吧！
                            <message_item class="msg_item" id="msg_item" v-for="(i,ind) in item.msgdata" :socket-i-d="i.id" :my-i-d="myID" :key="ind">
                                <img  slot="message_avatar" :src=i.avatar alt="">
                                <span slot="message_time">{{gettime(i)}}</span>
                                <span slot="message_name">{{i.username}}</span>
                                <span slot="message_item">{{i.text}}</span>
                            </message_item>
                        </message>
                    </div>
                </div>
<!--            发送表情、图片栏-->
            <div class='chating_tool'>
                <i class="iconfont icon-biaoqing"></i>
                <i class="iconfont icon-tupian"></i>
            </div>
<!--            输入框-->
            <div class='chating_foot'>
                <div class='foot_textarea'>
                    <textarea placeholder="请输入信息" id="chatting_textarea" class="textarea_text scroll"></textarea>
                </div>
                <div class='foot_sendbtn'>
                    <button class="sendbtn" @click="sendmsg">发送</button>
                </div>
            </div>
        </div>
        <audio :src=m4aurl id="myaudio" ref="auto"></audio>
    </div>

</template>
<script>

    import message_item from "../message/message_item";
    import message from "../message/message";
    import $ from 'jquery'
    export default {
        name: "Chatting",
        data(){
          return {
            msgdata:[],
            myID:this.$socket.id,
            userArr:[],
            allchattime:'',
            mysocketuserarr:[],
            withwho:'',
            allpeoplehistory:'',
            m4aurl:require('../../assets/audio/'+'8400.mp3')
          }
        },
        components:{
            message_item,
            message
        },
        methods:{
            sendmsg(){
                // 获取输入框的内容  // 获取到当前的textarea
                let textarea = $('.chat_chating.active #chatting_textarea')
                // 发出去的信息
                let text = {
                    text:textarea.val(),
                    id:this.$socket.id,
                    username:this.$socket.userName,
                    time:new Date().getMinutes(),
                    hourstime:new Date().getHours(),
                    avatar:this.$socket.avatar,
                    to:this.withwho
                };
                // 向服务器发送群聊消息 去掉空格 判断是不是空信息
                if(text.text.trim() != ''){

                    if (text.to != '群聊'){
                    //    是向私聊发的
                        this.mysocketuserarr.forEach((item,index) => {
                            if (item.name == text.to){
                                this.mysocketuserarr[index].msgdata.push(text)
                                // 自己发送私聊信息的时间
                                if (text.time<10){
                                    this.mysocketuserarr[index].prichattime = text.hourstime +":0"+ text.time
                                }else {
                                    this.mysocketuserarr[index].prichattime = text.hourstime +":"+ text.time
                                }
                                // 自己发送私聊信息的历史记录
                                this.mysocketuserarr[index].texthistory = text.text
                            }
                        })
                    }
                    this.$socket.emit('hi',text)
                    this.myID = text.id
                }else {
                    console.log('内容不能为空')
                }

                textarea.val('');
            },
            gettime(item){
                let howlong = new Date().getMinutes() - item.time
                if (howlong){
                    if(howlong<0){
                       return (item.hourstime - new Date().getHours())*60+howlong
                    }else{
                        return  howlong + "分钟前"
                    }
                } else {
                    return '刚刚'
                }
            },
            showchating(index){

                // 先清除之前显示的 显示右边的会话面板
                $('.chat_chating').removeClass('active')
                $('.user_item').removeClass('active')

                $('.chat_chating').eq(index).addClass('active')
                $('.user_item').eq(index).addClass('active')

                this.withwho = $('.chat_chating.active #chatname').text()
                // console.log(this.withwho)
            },
            myuserArr(arr){
                this.mysocketuserarr = arr
            }
        },
        computed:{
            ortheruserArr:function () {
                return function(arr){
                   return arr.filter((item) => {
                        return !(item.name == this.$socket.userName)
                    })
                }
            },
            UserArr() {
                    let that = this;
                    let newarr = this.userArr.filter((item) => {
                        // 去掉当前 socket 对象
                        return !(item.name == this.$socket.userName)
                    })
                    // 不让新用户进来就把之前用户的msgdata清空
                    let allpeoplechat = {name:'群聊',texthistory:'',msgdata:that.msgdata,myavatar:require('../../assets/img/'+'qunliao.jpg')}
                    newarr.unshift(allpeoplechat)

                    this.myuserArr(newarr)

                    console.log("compute方法执行了");
                    return this.mysocketuserarr

            },
        },
        sockets:{
            connect: function(){  //这里是监听connect事件
                this.id=this.$socket.id
            },
            allpeople(data){

                this.mysocketuserarr[0].msgdata.push(data);
                this.allpeoplehistory = data.username+':'+data.text;
                if (data.time<10){
                    this.allchattime = data.hourstime +":0"+ data.time
                }else {
                    this.allchattime = data.hourstime +":"+ data.time
                }
                // 播放提示音 如果不是我发的话
                console.log('tip'+this.$socket.tip)
                if (data.username != this.$socket.userName && this.$socket.tip){
                    document.getElementById('myaudio').play()
                }
            },
            privatechat(data){
                let ind;
               // 找到 mysocketuserarr 中发来信息的位置 username 是我的name to 接受者name
                this.mysocketuserarr.forEach((item,index) => {
                    if (item.name == data.username){
                        ind = index
                    }
                })

                this.mysocketuserarr[ind].msgdata.push(data);
                this.mysocketuserarr[ind].texthistory = data.text;
                if (data.time<10){
                    this.mysocketuserarr[ind].prichattime = data.hourstime +":0"+ data.time
                }else {
                    this.mysocketuserarr[ind].prichattime = data.hourstime +":"+ data.time
                }
                // 播放提示音
                console.log('tip'+this.$socket.tip)

                if (this.$socket.tip){
                    document.getElementById('myaudio').play()
                }
            },
            userarr(userArr){
                // 有客户端登录就触发
                let that = this;
                let flag = 0
                this.userArr = userArr
                // 当有新用户进来  保存聊天记录
                if (userArr.length != 1){
                    this.userArr.forEach((item,index) => {
                        if (item.name != that.$socket.userName && !flag){
                            console.log(item)
                            item.msgdata = that.mysocketuserarr[index+1].msgdata
                            item.texthistory = that.mysocketuserarr[index+1].texthistory
                        }else if (item.name == that.$socket.userName){
                            flag=1
                        }else {
                            item.msgdata = that.mysocketuserarr[index].msgdata
                            item.texthistory = that.mysocketuserarr[index].texthistory
                        }
                    })
                }
            }
        },
        created() {
            //一定要移除旧的message监听，否则会出现重复监听的状况
            this.$socket.removeAllListeners();
        },
    }
</script>

<style scoped>
    @import "../../assets/iconfont/iconfont.css";
    @import "../../assets/global/global.css";
    /* 中间栏目 */
    .iconfont{
        margin-left: 5px;
    }
    .user_search{
        height: 30px;
        padding: 10px;
        position: relative;
    }

    .panel_chat{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .chat_user{
        float: left;
        width: 220px;
        background-color: #ffffff;
        height: 100%;
    }
    .user_search{
        height: 30px;
        padding: 10px;
        position: relative;
    }
    .user_search i{
        height: 30px;
        left: 5px;
        top: 10px;
        width: 20px;
        color: #606266;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        position: absolute;
    }
    .search_input{
        width: 100%;
        height: 30px;
        color: #606266;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: #f2f2f2;
        border-radius: 4px;
        line-height: 30px;
        padding-left: 22px;
        padding-right: 10px;
        font-size: 14px;
    }
    /* 对话人物 */
    .user_list{
        height: calc(100% - 65px);
    }
    .user_list_container{
        height: 100%;
        overflow-y: auto;
    }
    .user_list_container .user_item{
        width: 200px;
        height: 40px;
        padding: 6px 10px;
    }
    .user_list_container .user_item:hover{
        background-color: #f2f2f2;
    }
    .user_list_container .user_item.active{
        background-color: #f2f2f2;
    }

    .user_item_avatar{
        width: 40px;
        height: 40px;
        float: left;
        background-color: lightskyblue;
    }
    .user_item_info{
        margin-left: 45px;
        font-size: 14px;
        position: relative;
    }
    .user_item_info .info_left{
        display: flex;
        flex-direction: column;
    }
    .user_item_info .info_right{
        top: 0;
        right: 0;
        height: 20px;
        font-size: 12px;
        color: #606266;
        line-height: 20px;
        position: absolute;
    }
    .user-item-num{
        position: absolute;
        right: 0;
        border-radius: 14px;
        font-size: 12px;
        color: #f2f2f2;
        background-color: #e64b15;
        top: 24px;
        min-width: 12px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        padding: 0 3px;
    }
    /* 会话面板 */
    .chat_chating{
        display: none;
        margin-left: 220px;
        position: relative;
        height: 100%;
    }
    .chat_chating.active{
        display: block;
    }
    .chating_head{
        height: 30px;
        padding: 10px 0;
        margin: 0 10px;
        border-bottom: 1px solid #d1d1d1;
    }
    .chating_head_avatar{
        display: inline-block;
        border: 0;
        margin: 0;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        line-height: 30px;
        border-radius: 4px;
        margin-right: 5px;
        background-color: lightblue;
    }
    .chating_head_name{
        font-size: 14px;
        color: #26292e;
        line-height: 30px;
    }
    .chating_head_device{
        vertical-align: middle;
        color:lightslategray;
    }

    .chating_msg{
        height: calc(100% - 210px);
    }
    .chating_msg_list{
        padding: 10px;
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .msg_item{
        margin-top: 10px;
    }
    .msg_item:first-child{
        margin-top: 0;
    }
    /* 发图片表情 */
    .chating_tool{
        border-top: 1px solid #d1d1d1;
        margin: 0 10px;
        height: 36px;
        line-height: 36px;
        vertical-align: middle;
        position: relative;
    }
    .chating_tool .iconfont{
        font-size: 24px;
        color: #606266;
        margin-right: 3px;
        cursor: pointer;
    }
    /* 输入框 */
    .chating_foot{
        margin: 0 10px;
    }
    .textarea_text{
        height: 60px;
        resize: none;
        overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
        background: transparent;
        border: none;
        outline: none;
        padding: 5px;
    }
    .foot_sendbtn{
        text-align: right;
        padding: 10px 0;
    }
    .sendbtn{
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        padding: 3px 30px;
        font-size: 14px;
        text-decoration: none;
        background-color: #fff;
        color: #222;
        cursor: pointer;
        outline: none;
    }
</style>