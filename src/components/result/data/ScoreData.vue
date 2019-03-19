
<template>
  <div id="bm-result-score" class="md-title">WEEKLY SCORE:
    <ul id="bm-result-list" class="md-list md-body-2">
      <li class="md-list-item">{{tokens[0]}}: {{score[0]}}</li>
      <li class="md-list-item">{{tokens[1]}}: {{score[1]}}</li>
      <li class="md-list-item">{{tokens[2]}}: {{score[2]}}</li>
      <li class="md-list-item">{{tokens[3]}}: {{score[3]}}</li>
      <li class="md-list-item">{{tokens[4]}}: {{score[4]}}</li>
      <li class="md-list-item">{{tokens[5]}}: {{score[5]}}</li>
      <li class="md-list-item">Layer: work in progress</li>
    </ul>
    <md-button
      id="bm-result-btn"
      class="md-raised"
      @mousedown="isShowingStatus = !isShowingStatus"
    >flower status</md-button>
    <div id="bm-result-flower" v-if="!calculating" v-show="isShowingStatus">
      <ul class="md-list md-body-2">
        <li class="md-list-item" v-for="(value, key) in flowerData" :key="key">{{key}}: {{value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
    this.setupVarations();
  },

  methods: {
    mapScoreToFlower(score) {
      let max = 4;
      this.flowerData.open = THREE.Math.mapLinear(
        score[5],
        0,
        max,
        -1.5,
        -0.1
      ).toFixed(2);
      this.flowerData.petalNum = Math.round(
        THREE.Math.mapLinear(score[1], 0, max, 3, 15)
      );
      this.flowerData.color = this.linearToColor(score[2], max);
      this.flowerData.leafNum = Math.round(
        THREE.Math.mapLinear(score[3], 0, max, 0, 12)
      );
      this.flowerData.animation = THREE.Math.mapLinear(
        score[4],
        0,
        max,
        0,
        1
      ).toFixed(2);
      this.flowerData.rootLength = THREE.Math.mapLinear(
        score[5],
        0,
        max,
        0.7,
        1.7
      );
      this.calculating = false;
      this.$emit("mapData", this.flowerData);
    },

    setupVarations() {
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

#bm-result-btn {
  position: absolute;
  top: -20px;
  left: 110%;
}

#bm-result-flower {
  width: 100%;
  position: absolute;
  left: 120%;
  top: 20px;
}
</style>
