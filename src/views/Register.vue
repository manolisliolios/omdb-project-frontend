<template>
  <div id="register">

    <div class="container">
      <h2>Register</h2>

      <div class="user-login-form mt-5">
        <b-form @submit.prevent="register">


        <b-form-input v-model="fullName" placeholder="Your name"/>
        <b-form-input v-model="email" placeholder="Your e-mail"/>
        <b-form-input v-model="password" type="password" placeholder="Your password"/>

        <div class="mt-2">
          <b-button type="submit" variant="primary" class="btn-block mb-3" >Register</b-button>
          Already have an account? <router-link :to="{name:'login'}">Login here</router-link>

        </div>
        </b-form>
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

      const body = {email: this.email, password: this.password, fullName: this.fullName}

      this.axios.post('/users/register', body).then(res=>{
        this.$notify({type: 'success', title:'Account created successfully', text: 'Your new account was created successfully.', position: 'bottom center'});

        this.$store.dispatch('login', {
          user:{
            fullName: res.data.fullName,
            email: res.data.email,
            id: res.data.id
          },
          token: res.data.token
        }).then(()=>{
          this.$router.push({name: 'home'});
        });
      }).catch(e=>{
        console.log(e);
        if(e.response.status === 409){
          this.$notify({type: 'error', title:'Account already exists', text: 'There is already one account using this e-mail.', position: 'bottom center'});
        }else{
          this.$notify({type: 'error', title:'Something went wrong', text: 'Please fill all the fields with their specifications.', position: 'bottom center'});
        }

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