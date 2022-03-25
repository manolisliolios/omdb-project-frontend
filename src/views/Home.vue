<template>

  <div id="home" class="h-100">

    <div class="container">
      <div class="row">

        <div class="col-12">
          <h5 v-if="isLoggedIn">Hey {{user.name}}</h5>
          <h2>Find your next <span class="text-switcher"> {{phrases[currIndex]}}</span></h2>
          <SearchBar/>
        </div>
      </div>
    </div>


  </div>

</template>
<style lang="scss">
#home{
  height:100%;
  .text-switcher{
    color:$primary;
  }
}
</style>
<script>
import SearchBar from "../components/SearchBar";
import {mapState} from "vuex";

export default{

  components: {SearchBar},
  computed:{
    ...mapState({
      count: state => state.count,
      user: state => state.user,
      isLoggedIn: state => state.isLoggedIn
    })
  },

  data(){
    return{
      phrases: ['Movie', 'Serie', 'Whatever'],
      selectedPhrase: 'Movie',
      currIndex: 0
    }
  },

  mounted(){
    this.$store.commit('increment');
    this.loopTexts();

  },

  methods:{
    loopTexts(){
      setTimeout(()=>{
        if (this.currIndex + 1 > (this.phrases.length - 1)) this.currIndex  =0;
        else this.currIndex +=1;
        this.loopTexts();
      }, 5000);
    }
  }
}


</script>