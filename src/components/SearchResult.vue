<template>

  <div class="search-result-item shadow-sm" @click="redirectToMovie(item.imdbID)">
    <div class="row align-items-center justify-content-center">
      <div class="col-4 col-md-2">
        <img :src="item.Poster" />
      </div>
      <div class="col-8 col-md-9">
        <h6 class="text-primary">{{item.Type}} since</h6>
        <h6>{{item.Year}}</h6>
        {{item.Title}}

      </div>
    </div>


  </div>
</template>

<style lang="scss">
.search-result-item{
  cursor:pointer;
  margin:1em 0;
  padding:.5em 1em;
  text-align:left;
  font-weight:bold;
  img{
    max-height:100px;
    border-radius:12px;
  }
}
</style>

<script>

export default{

  props:{
    item: Object
  },
  methods:{
    redirectToMovie(id){
      this.$router.push({name: 'movie', params: {movieId: id}});
    }
  }
}
</script>