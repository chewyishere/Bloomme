<template>
  <div id="resultPage">
    <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
    <three-flower
    :f1_scale="ui.flower_Layer1.size" 
    :f1_open="ui.flower_Layer1.open" 
    :f1_bendZ="ui.flower_Layer1.bendZ" 
    :f1_petalNum="ui.flower_Layer1.petalNum" 
    :f2_scale="ui.flower_Layer2.size" 
    :f2_open="ui.flower_Layer2.open" 
    :f2_bendZ="ui.flower_Layer2.bendZ" 
    :f2_petalNum="ui.flower_Layer2.petalNum" 
    :leafNum="ui.root.leafNum"
    :rootLength ="ui.root.length"
    :rootWave ="ui.root.wave"
    :color="ui.color.color"
    :dynamic="ui.color.dynamic">
    </three-flower>
  </div>
</template>

<script>
import ThreeFlower from './ThreeFlower.vue'
import * as gui from './three/gui/gui'
import DatGui from './three/gui/DatGui.vue'

export default {
  name: 'app',
  data () {
    let uiSetup = gui.setupPanel
    let ui = gui.getModel()
    return{
        ui,
        uiSetup
    }
  },
  components: {
   ThreeFlower,
   DatGui
  },

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
