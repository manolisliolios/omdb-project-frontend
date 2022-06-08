<template>
  <div id="login">

    <div class="container">
      <h2>Login</h2>

      <div class="user-login-form mt-5">
        <b-form @submit.prevent="login">
          <b-form-input v-model="email" placeholder="Your e-mail"/>
          <b-form-input v-model="password" type="password" placeholder="Your password"/>

          <div class="mt-2">
            <b-button type="submit" variant="primary" block class=" mb-3">Login</b-button>

            Are you new to our website? <router-link :to="{name:'register'}">Register here</router-link>
          </div>
        </b-form>

        <GoogleLogin/>
      </div>
    </div>

  </div>

</template>
<script>

import GoogleLogin from "../components/GoogleLogin";
export default{
  components: {GoogleLogin},

  data(){
    return{
      email: '',
      password: ''
    }
  },

  methods:{

    handleSuccessfullLogin(data){
      this.$store.dispatch('login', {
        user:{
          fullName: data.fullName,
          email: data.email,
          id: data.id
        },
        token: data.token
      }).then(()=>{
        this.$router.push({name: 'home'});
      });
    },
    login(){
      this.axios.post('/users/login', {email: this.email, password: this.password}).then(res=>{

        this.handleSuccessfullLogin(res.data);
      }).catch(()=>{
        this.$notify({type: 'error', title:'Something went wrong', text: 'The credentials you have entered are invalid or the account doesn\'t exist', position: 'bottom center'});
      })
    },


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