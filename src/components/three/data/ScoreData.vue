<template>
  <div id="bm-result-score" class="md-title">WEEKLY SCORE:
    <ul id="bm-result-list" class="md-list md-headline">
      <li class="md-list-item">{{tokens[0]}}: {{score[0]}}</li>
      <li class="md-list-item">{{tokens[1]}}: {{score[1]}}</li>
      <li class="md-list-item">{{tokens[2]}}: {{score[2]}}</li>
      <li class="md-list-item">{{tokens[3]}}: {{score[3]}}</li>
      <li class="md-list-item">{{tokens[4]}}: {{score[4]}}</li>
      <li class="md-list-item">{{tokens[5]}}: {{score[5]}}</li>
      <li class="md-list-item">Layer: (total score > 10: layer + 1): wip</li>
    </ul>
    <md-button class="md-raised" @mousedown="isShowingStatus = !isShowingStatus">show flower status</md-button>
    <div v-show="isShowingStatus">
      <ul class="md-list md-body-2" v-if="!calculating" v-for="(value, key) in flowerData">
        <li class="md-list-item">{{key}}: {{value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ScoreData",
  data() {
    return {
      flowerData: {},
      calculating: true,
      isShowingStatus: false
    };
  },
  props: {
    score: { type: Array },
    tokens: { type: Array }
  },

  mounted() {
    this.mapScoreToFlower(this.score);
    this.setupVarations(this.score);
  },

  methods: {
    mapScoreToFlower(score) {
      let max = 4;
      this.flowerData.open = THREE.Math.mapLinear(score[5], 0, max, -1.5, -0.3);
      this.flowerData.petalNum = Math.round(
        THREE.Math.mapLinear(score[1], 0, max, 3, 15)
      );
      this.flowerData.color = this.linearToColor(score[2], max);
      this.flowerData.leafNum = THREE.Math.mapLinear(score[3], 0, max, 0, 12);
      this.flowerData.animation = THREE.Math.mapLinear(score[4], 0, max, 0, 1);
      this.flowerData.rootLength = THREE.Math.mapLinear(
        score[5],
        0,
        6,
        0.7,
        1.7
      );
      this.calculating = false;
      this.$emit("mapData", this.flowerData);
    },

    setupVarations(score) {
      this.flowerData.bend = 0.08; //todo: randomizer
    },
    linearToColor(num, max) {
      let r = THREE.Math.mapLinear(num, 0, max, 0, 1);
      return new THREE.Color(r, 0, 1 - r);
    }
  }
};
</script>

<style>
#bm-result-score {
  z-index: 1;
  margin: 20px;
  width: 300px;
  opacity: 1;
  color: black;
  position: absolute;
  text-align: left;
  margin: 20px;
}

#bm-result-list {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
