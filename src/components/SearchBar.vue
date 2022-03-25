<template>

  <div id="search-bar">
    <div class="type-selector mb-3">
      <b-form-radio-group v-model="params.category" @change="searchCategoryChanged">
        <b-form-radio value="0">All</b-form-radio>
        <b-form-radio value="1">Search Movies</b-form-radio>
        <b-form-radio value="2">Search Series</b-form-radio>
      </b-form-radio-group>
    </div>

    <b-form-input v-model="params.search" placeholder="Start typing..." debounce="400"/>

    <div class="search-results">
      <div class="search-results-list">
        <SearchResult v-for="movie in movies" :key="movie.imdbID" :item="movie"/>
      </div>

      <div class="text-center">
        <b-pagination
            v-if="params.rows > 10"
            v-model="params.page"
            :total-rows="params.rows"
            :per-page="params.limit"
            aria-controls="my-table"
            class="mt-3"
            @input="fetchResults"
        ></b-pagination>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
.search-results-list{
  max-height:500px;
  overflow-y:scroll;
}
</style>
<script>

import SearchResult from "./SearchResult";

export default{

  components: {SearchResult},
  watch:{
    ['params.search'](newVal){
      if(newVal.length === 0) this.clearResults();
      if(newVal.length < 3) return;
      this.fetchResults();
    }
  },
  data(){
    return{
      params:{
        category: 0,
        search: '',
        page: 1,
        limit: 10,
        rows: 0
      },
      movies:[],
      types:{
        0: null,
        1: 'movie',
        2: 'series'
      }
    }
  },

  methods:{

    fetchResults(){
      let params = {
        s: this.params.search,
        page: this.params.page
      }
      if(this.params.category > 0){
        params['type'] = this.types[this.params.category]
      }
      this.axios.get('', {params}).then(res=>{
        this.movies = res.data.Search;
        this.params.rows = res.data.totalResults;
      });
    },
    clearResults(){
      this.params.page = 1;
      this.params.rows = 0;
      this.movies = [];
    },

    searchCategoryChanged(){
      this.clearResults();
      this.fetchResults();
    }
  }
}
</script>