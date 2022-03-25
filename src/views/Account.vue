<template>
  <div id="account">

    <h2>Account page</h2>

  <p>Want to logout?  <a href="#" @click.prevent="logout">Logout</a></p>
    <div class="account-page">
      {{user}}
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex"

export default{


  computed:{
    ...mapState({
      user: state => state.user
    })
  },
  methods:{
    logout(){
      this.$store.dispatch("logout").then( () => {
        this.$router.push({name: 'home'})
      });
    }
  }
}
</script>