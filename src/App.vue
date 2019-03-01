<template>
  <div id="app">
    <three-world></three-world>
  </div>
</template>

<script>
import ThreeWorld from './components/ThreeWorld.vue'

export default {
  name: 'app',
  components: {
   ThreeWorld
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
