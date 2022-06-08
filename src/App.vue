<template>
  <div id="app">
    <Header/>
    <div class="router-view-area">
      <router-view></router-view>
    </div>

    <Footer/>
    <notifications position="bottom center"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<style lang="scss">
#app {
  min-height:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .router-view-area{
    min-height:70vh;
  }
}
</style>
