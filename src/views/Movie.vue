<template>

  <div id="movie">
    <div v-if="movie" class="container">
      <b-button variant="primary" @click="$router.push('/')">Go Back</b-button>

      <div class="row align-items-center justify-content-center">

        <div class="col-12 col-md-3 mt-4">
          <img :src="movie.Poster"/>
        </div>
        <div class="col-12 col-md-9 mt-4 text-left">

          <h2>{{movie.Title}}</h2>
          <p>{{movie.Plot}}</p>


          <p><strong>Duration:</strong> {{movie.Runtime}}</p>
          <p><strong>Actors:</strong> {{movie.Actors}}</p>
          <p><strong>Writer:</strong> {{movie.Writer}}</p>
          <p><strong>Director:</strong> {{movie.Director}}</p>

          <b-button variant="primary" disabled>Rent now for 1.5$ <b-badge size="xs" variant="success">coming soon</b-badge></b-button>
        </div>
      </div>
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
      this.axios.get('/movies/'+this.$route.params.movieId, {
        params:{
          plot: 'full'
        }
      }).then(res=>{
        this.movie = res.data;
      })
    }
  }
}
</script>