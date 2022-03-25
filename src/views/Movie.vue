<template>

  <div id="movie">
    <b-button variant="primary" @click="$router.push('/')">Go Back</b-button>

    <div>
      {{movie}}
    </div>
  </div>
</template>


<script>

export default{


  mounted(){
    this.fetchMovie();
  },

  data(){
    return{
      movie: null
    }
  },

  methods:{
    fetchMovie(){
      this.axios.get('', {
        params:{
          i: this.$route.params.movieId
        }
      }).then(res=>{
        this.movie = res.data;
      })
    }
  }
}
</script>