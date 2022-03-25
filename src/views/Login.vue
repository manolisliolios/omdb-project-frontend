<template>
  <div id="login">

    <div class="container">
      <h2>Login</h2>

      <div class="user-login-form mt-5">
        <b-form-input v-model="email" placeholder="Your e-mail"/>
        <b-form-input v-model="password" type="password" placeholder="Your password"/>

        <div class="mt-2">
          <b-button variant="primary" class="btn-block" @click="login">Login</b-button>
        </div>
      </div>
    </div>

  </div>

</template>
<script>


export default{


  data(){
    return{
      email: '',
      password: ''
    }
  },

  methods:{
    login(){
      // login here

      this.$store.dispatch('login', {email: this.email}).then( () => {
        this.$router.push({name: 'account'})
      });

    }
  }
}
</script>

<style lang="scss">
#login{
  .user-login-form{
    input{
      max-width:500px;
      margin:0 auto;
      margin-bottom:1em;
    }
    .btn-block{
      max-width:500px;
      margin:0 auto;
    }
  }
}
</style>