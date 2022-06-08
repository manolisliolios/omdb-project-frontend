<template>
  <div id="googleLoginButton"></div>
</template>

<script>

export default{

  /*global google*/ //suppress google not found eslint warning. google has global script import.
  mounted(){
    let id = 'googleLoginScript';
    if(!document.getElementById(id)){

      let script = document.createElement('script');
      script.setAttribute('src', 'https://accounts.google.com/gsi/client');
      script.setAttribute('id', id);
      document.body.appendChild(script);

      script.onload = () => this.loadLoginButton();
    }else{
      this.loadLoginButton();
    }

  },
  methods:{
    loadLoginButton(){
      google.accounts.id.initialize({
        client_id: process.env.VUE_APP_GOOGLE_ID,
        callback: this.googleLogin
      });
      google.accounts.id.renderButton(
          document.getElementById("googleLoginButton"),
          { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    },

    googleLogin(token){
      this.axios.post('/users/google-login', {token: token.credential}).then(res=>{
        this.$emit('loggedIn', res.data);
        this.handleGoogleLogIn(res.data);
      }).catch(()=>{
        this.$notify({type: 'error', title:'Failed to login with google', text: 'Something went wrong during logging in.', position: 'bottom center'});

      })
    },
    handleGoogleLogIn(data){
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
  }
}
</script>

<style lang="scss">
#googleLoginButton{
  margin-top:3rem;
  justify-content: center;
  display:flex;
}
</style>