<template>

  <div v-if="item">
    <div class="search-result-item" :style="`background-image:url('${item.Poster}')`">
      <div class="__overlay"></div>
      <div class="__content">

        <div class="__bookmark">
          <b-button variant="link" :title="buttonTitle(item.imdbID)" v-b-tooltip.hover
                    @click="bookmarks.includes(item.imdbID) ? removeBookmark(item.imdbID) : addBookmark(item.imdbID)">
            <img :src="bookmarks.includes(item.imdbID) ? bookmarkFilled : bookmark"/>
          </b-button>

        </div>
          <h2 class="text-white">
            {{item.Title}}
          </h2>
          <h5 class="text-primary">{{item.Year}}</h5>

          <p class="desc">
            {{item.Plot}}
          </p>

        <b-button variant="outline-white" class="movie-card__button"  @click="redirectToMovie(item.imdbID)">
          View Details
        </b-button>



      </div>



    </div>
  </div>

</template>

<style lang="scss">
.search-result-item{

  background-size: 60%;
  background-repeat: no-repeat;
  background-position:bottom left;
  width:100%;
  max-width: 800px;
  height: 100%;
  min-height: 300px;
  display: block;
  margin: 1rem auto;
  border-radius: 15px;
  box-shadow: 0px 8px 12px 0px rgba(0,0,0,0.25);
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95%;
    max-width: 95%;
  }
  @media screen and (max-width: 600px) {
    background-position:50% 0%;
    background-size: cover;
    height: 400px;
  }
  padding:.5em 1em;
  text-align:left;
  font-weight:bold;
  .__bookmark{
    cursor:pointer;
    width:14px;
    position:absolute;
    top:10px;
    right:5px;
    button{
      width:14px;
      padding:0;
      margin:0;
    }
  }
  .__overlay {
    width:100%;
    border-radius: 15px;
    height: 100%;
    background: linear-gradient(to right, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    background-blend-mode: multiply;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    @media screen and (max-width: 600px) {
      background: linear-gradient(to bottom, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    }
  }
  .__content {
    width: 100%;
    max-width:370px;
    padding-top:0.5rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position:relative;
    float: right;
    padding-right: 3rem;
    padding-bottom: 1em;
    @media screen and (max-width: 1000px) {
      width: 50%;
    }
    @media screen and (max-width: 600px) {
      margin-top: 4.2em;
      width: 100%;
      float: inherit;
      max-width: 100%;
      padding: 0 1em 1em;
    }
    h2{
      font-size:1.5rem;
      opacity:0.8;
    }
    .desc{
      color:#fff;
      font-weight:300;
    }
  }
}
</style>

<script>

import bookmark from "@/assets/images/bookmark.svg";
import bookmarkFilled from "@/assets/images/bookmark-filled.svg";
export default{

  props:{
    item: Object,
    bookmarks: Array,
    isLoggedIn: Boolean
  },
  data(){
    return{
      bookmark: bookmark,
      bookmarkFilled: bookmarkFilled
    }
  },
  methods:{
    buttonTitle(id){
      if(!this.isLoggedIn) return 'You need to login to use this feature!';

      if(this.bookmarks.includes(id)) return 'Remove from bookmarks'
      return 'Add to bookmarks';
    },
    redirectToMovie(id){
      this.$router.push({name: 'movie', params: {movieId: id}});
    },

    addBookmark(id){
      if(!this.isLoggedIn) return;
      this.axios.post('/bookmarks', {
        movieId: id
      }).then(res=>{
        this.$notify({type: 'success', title:'Bookmark added successfully', text: 'Movie was saved successfully to your bookmarks.', position: 'bottom center'});
        this.$store.dispatch('addBookmark', id);
        console.log(res.data);
      }).catch(()=>{
        this.$notify({type: 'error', title:'Something went wrong', text: 'Failed to add the bookmark. Please try again later.', position: 'bottom center'});
      })
    },
    removeBookmark(id){
      if(!this.isLoggedIn) return;
      this.axios.delete('/bookmarks/'+id, ).then(()=>{
        this.$store.dispatch('removeBookmark', id);
        this.$notify({type: 'success', title:'Bookmark removed successfully', text: 'Bookmark was removed successfully.', position: 'bottom center'});
      }).catch(()=>{
        this.$notify({type: 'error', title:'Something went wrong', text: 'Failed to remove the bookmark. Please try again later.', position: 'bottom center'});
      })
    },
  }
}
</script>