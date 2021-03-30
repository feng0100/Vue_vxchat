<template>
    <div class="message-item-warp webChat-clear" :class="wichone?'message-item-send':'message-item-receive'">
        <div class="message-avatar">
            <slot name="message_avatar"></slot>
        </div>
        <div class="message-item-container">
            <div class="message-info-container" >
                <span class="message-info-time" ><slot name="message_time"></slot></span>
                <span class="message-info-name"><slot name="message_name"></slot></span>
            </div>
            <div class="message-content-warp">
                    <div class="message-content-container">
                        <slot name="message_item"></slot>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "message_item",
        computed:{
        },
        data(){
            return {
                wichone:false
            }
        }
        ,
        methods:{
            whosend:function () {
                if (this.socketID === this.myID){
                    this.wichone = true
                }
            }
        },
        props:['socketID','myID'],
        created() {
           this.whosend();
        }
    }
</script>

<style scoped>
    .message-avatar{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-top: 10px;
        position: relative;
    }
    .message-avatar img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .message-item-container{
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 5px;
    }
    .message-content-container{
        line-height: 20px;
        min-height: 20px;
        padding: 10px;
        display: inline-block;
        background-color: #ffffff;
        border-radius: 4px;
        font-size: 14px;
        text-align: left;
        color: #606266;
        word-break: break-all;
    }
    /*.message-content-container .expression-img{*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    vertical-align: middle;*/
    /*    line-height: 20px;*/
    /*    position: relative;*/
    /*    top: -1px;*/
    /*}*/
    .message-info-container{
        line-height: 20px;
    }
    .message-info-container .message-info-name{
        font-size: 14px;
        color: #333333;
    }
    .message-image-warp{
        width: 100%;
    }
    .message-image-warp img{
        max-width: 100%;
    }
    .message-info-container .message-info-time{
        font-size: 12px;
        color: #606266;
        margin: 0 5px;
    }
    .message-item-send .message-avatar{
        float: right;
    }
    .message-item-send .message-content-warp,
    .message-item-send .message-info-container{
        text-align: right;
    }
    .message-item-send .message-content-container{
        background-color: #0087f7;
        color: #f2f2f2;
        position: relative;
    }
    .message-item-send .message-content-container:after{
        display: block;
        content: '';
        position: absolute;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #0087f7;
        top: 15px;
        left: 100%;
    }
    .message-item-receive .message-content-container{
        position: relative;
        background-color: #ffffff;
        color: #606266;
    }
    .message-item-receive .message-info-container{
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

    .message-item-receive .message-avatar{
        float: left;
    }
    .message-item-receive .message-content-container:before{
        display: block;
        content: '';
        position: absolute;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid #ffffff;
        top: 15px;
        right: 100%;
    }
</style>