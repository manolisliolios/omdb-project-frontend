<template>
  <div id="account">

    <h2>Your bookmarks, <span class="text-primary-gradient">{{user.fullName}}</span></h2>
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
    fetchBookmarks(){
      this.axios.get('/bookmarks').then(res => {
console.log(res);
      }).catch(e=>{
        console.log(e);
      })
    }
  },
  data(){
    return{
      bookmarks: null
    }
  },
  mounted(){

    this.fetchBookmarks();
  }
}
</script>