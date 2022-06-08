<template>
  <div id="account">

    <h2>Your bookmarks, <span class="text-primary-gradient">{{user.fullName}}</span></h2>
    <div class="account-page">

      <div class="container">

        <div class="row">
          <div v-for="bookmark of bookmarkData" class="col-12 col-md-6 text-left" :key="bookmark.imdbID">
            <search-result :item="bookmark" :is-logged-in="true" :bookmarks="bookmarks"/>
          </div>
          <div v-if="bookmarks.length === 0" class="col-12 text-center mt-5">
            <p>
              You haven't saved any bookmarks yet.
            </p>
            <b-button variant="primary" @click="$router.push({name:'home'})">Start browsing movies and series</b-button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import SearchResult from "../components/SearchResult";
import {mapState} from "vuex"
export default{

  components:{SearchResult},
  computed:{
    ...mapState({
      user: state => state.user,
      bookmarks: state => state.bookmarks
    })
  },
  watch:{
    bookmarks(){
      console.log('changed');
      this.fetchBookmarkMovies();
    }
  },
  methods:{
    fetchBookmarkMovies(){
      this.bookmarkData = [];
      for(let bookmark of this.bookmarks){
        this.axios.get('/movies/'+bookmark, {params: {plot:'short'}}).then(res=>{
          this.bookmarkData.push(res.data);
        })
      }
    }
  },
  data(){
    return{
      bookmarkData: []
    }
  },
  mounted(){
    this.fetchBookmarkMovies();
  }
}
</script>