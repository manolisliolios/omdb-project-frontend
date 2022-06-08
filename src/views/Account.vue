<template>
  <div id="account">

    <h2>Welcome, <span class="text-primary-gradient">{{user.fullName}}</span></h2>


  <p>Want to logout?  <a href="#" @click.prevent="logout">Logout</a></p>
    <div v-if="userObj" class="account-page">

      <div class="container">

        <div class="row">
          <div class="col-12 col-md-6 text-left">

            <b-card>
              <b-card-title><h6>Your profile details</h6></b-card-title>
              <b-card-body>
                <b-form-input v-model="userObj.fullName" class="mb-2" disabled/>

                <b-form-input v-model="userObj.email" disabled/>
              </b-card-body>
            </b-card>


          </div>
        </div>

      </div>
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
  },
  data(){
    return{
      userObj: null
    }
  },
  mounted(){
    this.userObj = {...this.user};
  }
}
</script>