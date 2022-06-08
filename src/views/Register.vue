<template>
  <div id="register">

    <div class="container">
      <h2>Register</h2>

      <div class="user-login-form mt-5">
        <b-form @submit.prevent="register">

        </b-form>
        <b-form-input v-model="fullName" placeholder="Your name"/>
        <b-form-input v-model="email" placeholder="Your e-mail"/>
        <b-form-input v-model="password" type="password" placeholder="Your password"/>

        <div class="mt-2">
          <b-button type="submit" variant="primary" class="btn-block mb-3" >Register</b-button>
          Already have an account? <router-link :to="{name:'login'}">Login here</router-link>

        </div>
      </div>
    </div>

  </div>

</template>
<script>


export default{


  data(){
    return{
      email: null,
      password: null,
      fullName: null
    }
  },

  methods:{
    register(){

      if(!this.email || !this.password || !this.fullName){
        this.$notify({type: 'error', title:'Something went wrong', text: 'Please fill in all fields', position: 'bottom center'});
        return;
      }

      this.axios.post('/users/register', {email: this.email, password: this.password, fullName: this.fullName}).then(res=>{
        console.log(res);
      }).catch(e=>{
        console.log(e);
      })

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