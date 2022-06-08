<template>

  <div ref="search-bar" id="search-bar">
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
        <div class="row">
          <SearchResult v-for="movie in movies" :key="movie.imdbID" :item="movie"
                        :bookmarks="bookmarks" :is-logged-in="isLoggedIn" class="col-12 col-md-6 p-2"/>
        </div>

      </div>

      <div class="text-center">
        <b-pagination
            pills
            v-if="params.rows > 10"
            v-model="params.page"
            :total-rows="params.rows"
            :per-page="params.limit"
            :last-number="true"
            align="center"
            aria-controls="my-table"
            class="mt-3"
            @input="pageChanged"
        ></b-pagination>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
.search-results-list{
  margin-bottom:2rem;
}
</style>
<script>
import axios from "axios";
import SearchResult from "./SearchResult";
import Vue from "vue";
import {mapState} from "vuex";

export default{

  computed:{
    ...mapState({
      bookmarks: state => state.bookmarks,
      isLoggedIn: state => state.isLoggedIn
    }),

  },
  components: {SearchResult},
  watch:{
    ['params.search'](newVal){
      if(newVal.length === 0) this.clearResults();
      if(newVal.length < 3) return;
      this.params.page = 1; // reset pagination when changin search
      localStorage.setItem('search', newVal); // save state for next rendering
      this.fetchResults();
    },
    ['params.page'](newVal){
      localStorage.setItem('page', newVal); // save state for next rendering
    }
  },
  data(){
    return{
      params:{
        category: 0,
        search: localStorage.getItem('search') || '',
        page: localStorage.getItem('page') ? parseInt(localStorage.getItem('page')): 1,
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
  mounted(){
    if(this.params.search.length >0){
      this.fetchResults();
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

      this.axios.get('/movies', {params}).then(res=>{
        this.movies = res.data.Search;
        this.params.rows = res.data.totalResults;

        const extraRequests = [];

        for(let movie of this.movies){
          extraRequests.push(this.axios.get('/movies/' + movie.imdbID))
        }

        axios.all(extraRequests).then(axios.spread((...res)=>{
          for(let [index,value] of Object.entries(res)){
            // set with vue.set to get Reactivity and update child component!
            Vue.set(this.movies[index], 'Plot', value.data.Plot);
          }
        }))
      });
    },
    clearResults(){
      this.params.page = 1;
      this.params.rows = 0;
      this.movies = [];
      localStorage.removeItem('search')
    },

    searchCategoryChanged(){
      this.clearResults();
      this.fetchResults();
    },
    pageChanged(){
      this.$refs['search-bar'].scrollIntoView();
      this.fetchResults();
    }
  }
}
</script>