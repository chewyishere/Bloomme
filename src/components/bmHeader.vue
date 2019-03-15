<template>
  <div id="bm-header">
    <md-avatar id="bm-profile" class="md-large">
      <img id="bm-profile--photo" ref="photo" v-show="photoConfirmed">
    </md-avatar>
  </div>
</template>

<script>
import { bus } from "../main.js";

export default {
  name: "Header",
  props: ["userName"],
  data() {
    return {
      photoConfirmed: false
    };
  },

  mounted() {
    bus.$on("confirmPhoto", snap => {
      this.setupProfile(snap);
    });
  },

  methods: {
    setupProfile(snap) {
      this.photoConfirmed = true;
      this.$refs.photo.setAttribute("src", snap);
    }
  }
};
</script>


<style scope>
h3 {
  text-align: center;
  margin: 0;
}
#bm-profile--photo {
  max-width: unset;
  width: unset;
}

#bm-header {
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 130px;
}
</style>