<template>
  <div id="register">

    <div class="container">
      <h2>Register</h2>

      <div class="user-login-form mt-5">
        <b-form-input v-model="fullName" name="name" placeholder="Your full name"/>
        <b-form-input v-model="email" placeholder="Your e-mail"/>
        <b-form-input v-model="password" type="password" placeholder="Your password"/>

        <div class="mt-2">
          <b-button variant="primary" class="btn-block" @click="register">Register</b-button>
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
      password: '',
      fullName: ''
    }
  },

  methods:{
    register(){

      // this.axios
      // login here

      this.$store.dispatch('login', {email: this.email}).then( () => {
        this.$router.push({name: 'account'})
      });

    }
  }
}
</script>

<style lang="scss">
#register{
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