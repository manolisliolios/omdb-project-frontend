<template>
  <header id="header" class="p-3">
    <div class="container">
      <div class="row">
        <div class="col-3">

        </div>
        <div class="col-9 text-right">
          <router-link :to="{name:'home'}">Home</router-link>
          <router-link v-if="!isLoggedIn" :to="{name: 'login'}">Login</router-link>
          <router-link v-if="isLoggedIn" :to="{name: 'account'}">
            Account</router-link>
        </div>
      </div>
    </div>

  </header>
</template>

<script>

import {mapState} from "vuex";

export default{

  computed:{
    ...mapState({
      user: state => state.user,
      isLoggedIn: state => state.isLoggedIn
    })
  },


}
</script>
<style lang="scss">
#header{
  a{
    font-size:1.2em;
    font-weight:400;
    margin-right:1em;
    text-decoration:none;
  }
}
</style>