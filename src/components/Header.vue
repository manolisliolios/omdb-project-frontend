<template>
  <header id="header" class="p-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-6 col-md-3">

          <router-link :to="{name:'home'}">
            <img src="@/assets/images/logo.svg"/>
          </router-link>


        </div>
        <div class="col-6 col-md-9 text-right">

          <b-button variant="link" @click="redirectTo('home')">
            Home
          </b-button>

          <b-button v-if="!isLoggedIn"  variant="primary" @click="redirectTo('login')">
            Login / Register
          </b-button>
          <b-button v-else  variant="primary" @click="redirectTo('account')">
            Account
          </b-button>

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
  methods:{
    redirectTo(url){
      this.$router.push({name: url});
    }
  }


}
</script>
<style lang="scss">
#header{
  .container{
    margin-bottom:2rem;
    padding:1rem 2rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: #f9f9f9;
    border-radius:25px;
  }
  a{
    font-size:1.2em;
    font-weight:400;
    margin-right:1em;
    text-decoration:none;
  }
}
</style>