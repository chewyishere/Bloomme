<template>
  <div class="webCam">
    <video id="bm-photo--video" @canplay="canPlayListener" ref="video"></video>
    <div ref="control" id="bm-photo--controls">
      <md-button v-show="!photoTaken" @click="takePhoto()" ref="startbutton">take a photo</md-button>
      <md-button v-show="photoTaken" @click="confirmPhoto()" ref="nicebutton">nice!</md-button>
      <md-button v-show="photoTaken" @click="clearPhoto()" ref="clearbutton">cancel</md-button>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { bus } from "../main.js";

export default {
  name: "Camera",
  data() {
    return {
      width: 400,
      height: 0,
      streaming: false,
      video: null,
      canvas: null,
      control: null,
      errorMsg: null,
      startbutton: null,
      photoTaken: false,
      snap: null,
      track: null
    };
  },

  created() {},

  mounted() {
    this.video = this.$refs.video;
    this.control = this.$refs.control;
    this.canvas = this.$refs.canvas;
    this.setupMeida();
  },

  methods: {
    setupMeida() {
      var vm = this;
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (!navigator.getMedia) {
        this.displayErrorMessage(
          "Your browser doesn't have support for the navigator.getUserMedia interface."
        );
      } else {
        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          // Success Callback
          function(stream) {
            // Create an object URL for the video stream and
            // set it as src of our HTLM video element.
            vm.video.src = window.URL.createObjectURL(stream);

            // Play the video element to start the stream.
            vm.video.play();
            vm.video.onplay = function() {
              vm.showVideo = true;
            };
            vm.track = stream.getVideoTracks()[0];
          },
          // Error Callback
          function(err) {
            vm.displayErrorMessage(
              "There was an error with accessing the camera stream: " +
                err.name,
              err
            );
          }
        );
      }
    },

    canPlayListener: function() {
      if (!this.streaming) {
        this.height =
          this.video.videoHeight / (this.video.videoWidth / this.width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(this.height)) {
          this.height = this.width / (4 / 3);
        }
        this.video.setAttribute("width", this.width);
        this.video.setAttribute("height", this.height);
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        this.streaming = true;
      }
    },

    takeSnapShot() {
      var context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);

      return this.canvas.toDataURL("image/png");
    },

    takePhoto() {
      this.snap = this.takeSnapShot();
      this.video.pause();
      this.photoTaken = true;
    },

    clearPhoto() {
      var context = this.canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      var data = this.$refs.canvas.toDataURL("image/png");
      this.video.play();
      this.photoTaken = false;
    },

    confirmPhoto() {
      bus.$emit("confirmPhoto", this.snap);
      this.track.stop();
    },

    displayErrorMessage(error_msg, error) {
      error = error || "";
      if (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style scoped>
.webcam {
  width: 100%;
  height: 80%;
}
#bm-photo--video {
  width: 100%;
  height: 80%;
  background: black;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: none;
}

canvas {
  display: none;
}

#bm-photo--controls {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 30px;
  display: block;
}
</style>