<template>
  <div class="bm-page" id="bm-photo">
    <p class="md-headline">{{title}}</p>
    <!-- <button @click="takePhoto()">{{btnPhoto}}</button> -->
    <camera></camera>
    <div v-if="photoTaken" class="bm-photo--completed">
      <button class="bm-photo-btn" @click="switchComponent()">looking good!</button>
      <button class="bm-photo-btn" @click="cancelPhoto()">redo</button>
    </div>
  </div>
</template>

<script>
import { bus } from "../main.js";
import Camera from "@/components/Camera";

export default {
  name: "bm-photo",
  props: ["contents"],
  data() {
    return {
      step: 3,
      photoTaken: false
    };
  },
  components: {
    Camera
  },
  created() {
    this.title = this.contents.photo.title;
    this.btnPhoto = this.contents.photo.btnPhoto;
  },

  methods: {
    switchComponent() {
      bus.$emit("switchComp", this.step);
    },
    takePhoto() {
      console.log("take photo");
      this.photoTaken = true;
    },
    cancelPhoto() {
      console.log("cancel photo");
      this.photoTaken = false;
    }
  }
};
</script>

<style>
#bm-photo {
  background: aqua;
}
.bm-photo--completed {
  width: 50%;
  height: 50%;
  position: relative;
  margin: auto 0;
}
</style>