<template>
  <div id="app">
    <div class="chat">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

}
</script>

<style>
  .chat{
    width: 840px;
    height: 700px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    position: fixed;
  }

</style>
