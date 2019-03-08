<template>
  <div class="webCam">
    <video @canplay="canPlayListener" ref="video"></video>
    <img ref="photo">
    <div ref="control" class="bm-photo--controls">
      <button @click="takePhoto()" ref="startbutton">take a photo</button>
      <button @click="clearPhoto()" ref="clearbutton">cancel</button>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
      width: 400,
      height: 300,
      streaming: false,
      video: null,
      canvas: null,
      photo: null,
      control: null,
      errorMsg: null,
      photoTaken: false,
      startbutton: null
    };
  },

  created() {},

  mounted() {
    this.video = this.$refs.video;
    this.photo = this.$refs.photo;
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
      console.log(this);
      var context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);

      return this.canvas.toDataURL("image/png");
    },

    takePhoto() {
      var snap = this.takeSnapShot();

      // Show image.
      this.photo.setAttribute("src", snap);
      this.photo.classList.add("visible");

      // Enable delete and save buttons
      // delete_photo_btn.classList.remove("disabled");
      // download_photo_btn.classList.remove("disabled");

      // Set the href attribute of the download button to the snap url.
      //download_photo_btn.href = snap;

      // Pause video playback of stream.
      this.video.pause();
      this.photoTaken = true;
    },

    clearPhoto() {
      var context = this.canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      var data = this.$refs.canvas.toDataURL("image/png");
      this.photo.setAttribute("src", data);
      this.photoTaken = false;
      this.video.play();
    },

    displayErrorMessage(error_msg, error) {
      error = error || "";
      if (error) {
        console.log(error);
      }

      //   this.errorMsg.innerText = error_msg;
      //   //hideUI();
      //   this.errorMsg.classList.add("visible");
    }
  }
};
</script>


<style>
video {
  display: block;
  width: 100%;
  background: aliceblue;
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

.bm-photo--controls {
  position: absolute;
  top: 0;
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