<template>
  <div id="app">
    <home :content="content"></home>
  </div>
</template>

<script>

//components 
import Home from './components/Home.vue'
import Result from './components/Result.vue'

export default {
  name: 'app',
  data () {
    return{
      content: {}
    }
  },
  components: {
   Home,
   Result
  },
  created() {
    var vm = this
    this.$http
      .get('./content/content.json')
      .then(function(response) {
        vm.content = response.data.data
        console.log(vm);
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
