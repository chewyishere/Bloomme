<template>
  <div class="bm-page" id="bm-Result">
    <p class="md-display-1">{{title}}</p>
    <p class="md-headline">{{subtitle}}</p>
    <score-data
      :flowerData="flowerData"
      :tokens="tokens"
      :score="score"
      @mapData="flowerData = $event"
    ></score-data>
    <md-button
      id="bm-result-btn--debug"
      class="md-raised"
      @mousedown="debugMode = !debugMode"
    >Customize Flower</md-button>
    <dat-gui v-show="debugMode" :setup="uiSetup" :model="ui"></dat-gui>
    <three-flower
      v-if="!calculating"
      :f1_scale="ui.flower_Layer1.size"
      :f1_open="ui.flower_Layer1.open"
      :f1_petalShape="ui.flower_Layer1.petalShape"
      :f1_petalNum="ui.flower_Layer1.petalNum"
      :f1_color="ui.flower_Layer1.color"
      :f2_enable="ui.flower_Layer2.enable"
      :f2_scale="ui.flower_Layer2.size"
      :f2_open="ui.flower_Layer2.open"
      :f2_petalShape="ui.flower_Layer2.petalShape"
      :f2_petalNum="ui.flower_Layer2.petalNum"
      :f2_color="ui.flower_Layer2.color"
      :f3_enable="ui.flower_Layer3.enable"
      :f3_scale="ui.flower_Layer3.size"
      :f3_open="ui.flower_Layer3.open"
      :f3_petalShape="ui.flower_Layer3.petalShape"
      :f3_petalNum="ui.flower_Layer3.petalNum"
      :f3_color="ui.flower_Layer3.color"
      :leafNum="ui.root.leafNum"
      :rootLength="ui.root.length"
      :rootWave="ui.root.wave"
      :flowerData="flowerData"
    ></three-flower>
  </div>
</template>

<script>
import ThreeFlower from "@/components/result/ThreeFlower.vue";
import * as gui from "@/components/result/three/gui/gui";
import DatGui from "@/components/result/DatGui.vue";
import ScoreData from "@/components/result/data/ScoreData.vue";

export default {
  name: "bm-Result",
  props: ["contents", "score"],
  data() {
    let uiSetup = gui.setupPanel;
    let ui = gui.getModel();
    return {
      step: 5,
      ui,
      uiSetup,
      debugMode: false,
      calculating: true,
      tokens: [],
      flowerData: {}
    };
  },
  components: {
    ThreeFlower,
    DatGui,
    ScoreData
  },

  created() {
    this.title = this.contents.result.title;
    this.subtitle = this.contents.result.subtitle;
  },
  mounted() {
    this.tokens = this.contents.questions.tokens;
    this.calculating = true;
  },
  watch: {
    flowerData: function() {
      this.calculating = false;
    }
  }
};
</script>

<style>
#bm-result-btn--debug {
  position: absolute;
  z-index: 9;
  right: 20px;
}
</style>
