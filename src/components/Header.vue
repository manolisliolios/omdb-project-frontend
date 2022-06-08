<template>
  <header ref="header-cmp" id="header" class="p-3">
    <div class="container header-bar-container">
      <div class="row align-items-center">
        <div class="col-6 col-md-3 logo">

          <router-link :to="{name:'home'}">
            <img src="@/assets/images/logo.svg"/>
          </router-link>


        </div>
        <div class="col-6 col-md-9 text-right desktop-version">

          <b-button variant="link" @click="redirectTo('home')">
            Home
          </b-button>

          <b-button v-if="isLoggedIn" variant="link" @click="redirectTo('bookmarks')">
            Bookmarks
          </b-button>


          <b-button v-if="!isLoggedIn"  variant="primary" @click="redirectTo('login')">
            Login / Register
          </b-button>
          <b-button v-else  variant="primary" @click="redirectTo('account')">
            Account
          </b-button>

        </div>

        <div class="col-6 col-md-9 text-right mobile-version">
          <label class="menu-button-wrapper" for="" @click="fullScreenMenu = !fullScreenMenu">
            <input type="checkbox" class="menu-button" :class="fullScreenMenu ? 'toggled' : ''">
            <div class="icon-wrapper">
              <label class="hamburger">
                <input class="hamburger-input" type="checkbox">
                <span class="hamburger-line first"></span>
                <span class="hamburger-line second"></span>
                <span class="hamburger-line third"></span>
              </label>
            </div>
          </label>
        </div>
      </div>
    </div>


    <div id="mobile-header" :class="fullScreenMenu ? 'show' :''">

      <div class="mobile-header-content container">
        <b-button variant="link" block @click="redirectTo('home')">
          Home
        </b-button>

        <b-button v-if="isLoggedIn" block variant="link" @click="redirectTo('bookmarks')">
          Bookmarks
        </b-button>


        <b-button v-if="!isLoggedIn" block variant="primary" @click="redirectTo('login')">
          Login / Register
        </b-button>
        <b-button v-else  variant="primary" block @click="redirectTo('account')">
          Account
        </b-button>

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
    }),
    getHeaderHeight(){

      if(!this.$refs['header-cmp']) return 100;

      return this.$refs['header-cmp'].getBoundingClientRect().bottom;
    }
  },
  methods:{
    redirectTo(url){
      this.fullScreenMenu = false;
      this.$router.push({name: url});
    }
  },

  data(){
    return{
      fullScreenMenu: false
    }
  }


}
</script>
<style lang="scss">
#header{
  .logo{
    z-index:99999;
  }
  .header-bar-container{
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

  .desktop-version{
    @media(max-width:767px){
      display:none;
    }
  }
  .mobile-version{
    @media(min-width:768px){
      display:none;
    }
  }
}

#mobile-header{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#fff;
  z-index:999;
  display:none;
  &.show{
    display:block;
  }
  .mobile-header-content{
    margin-top:10rem;
  }
}
.hamburger {
  position: relative;
  width: 50px;
  height: 50px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
  margin-bottom:0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: #f953c6;  /* fallback for old browsers */
    background: $default-gradient; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    transform: rotate(0deg);
    transition: all 0.4s cubic-bezier(0.54, -0.10, 0.57, 0.57);
  }

  .hamburger-input {
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .hamburger-line {
    width: 100%;
    background: #fff;
    height: 1px;
    display: block;
    border-radius: 6px;
    transition: transform 0.4s cubic-bezier(0.54, -0.81, 0.57, 0.57);
    position: relative;

    &.first,
    &.third {
      width: 50%;
    }

    &.third {
      margin-left: 50%;
      transform-origin: left;
    }
  }
}

.menu-button-wrapper {
  z-index:99999;
  position: relative;
  display: inline-block;

  .menu-button {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 0;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }
}

.menu-button {
  &.toggled ~ .item-list {
    transform: translateX(-50%) scale(1);
    border-radius: 15px;
    opacity: 1;
    user-select: auto;
  }

  &.toggled ~ .icon-wrapper .hamburger-line.second {
    transform: rotate(-45deg);
  }

  &.toggled ~ .icon-wrapper .hamburger-line.first {
    transform: translate(2px, 5px) rotate(-135deg);
  }

  &.toggled ~ .icon-wrapper .hamburger-line.third {
    transform: translate(9px, -1px) rotate(-135deg);
  }

  &.toggled ~ .icon-wrapper .hamburger:before {
    transform: rotate(45deg);
  }
}
</style>