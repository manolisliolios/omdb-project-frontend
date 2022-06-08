<template>

  <div v-if="item">
    <div class="search-result-item" @click="redirectToMovie(item.imdbID)" :style="`background-image:url('${item.Poster}')`">
      <div class="__overlay"></div>
      <div class="__content">

          <h2 class="text-white">
            {{item.Title}}
          </h2>
          <h5 class="text-primary">{{item.Year}}</h5>

          <p class="desc">
            {{item.Plot}}
          </p>



      </div>



    </div>
  </div>

</template>

<style lang="scss">
.search-result-item{
  cursor:pointer;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position:bottom left;
  width:100%;
  max-width: 800px;
  height: 100%;
  min-height: 250px;
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
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position:relative;
    float: right;
    padding-right: 1.2em;
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