<template>
    <div class="chat_home">
        <Menu></Menu>
        <div class="home_panel">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Menu from "../Menu/Menu";
    export default {
        name: "Home",
        components:{
            Menu,
        }
    }
</script>

<style scoped>
    .chat_home{
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
    }
    .home_panel{
        margin-left: 60px;
        height: 100%;
    }
</style>