

<template>
  <div ref="canvas" id="mb-result-ThreeContainer"></div>
</template>

<script>
/* eslint-disable */
import * as Three from "three";
import OrbitControls from "@/utils/OrbitControls";
import FlowerHead from "@/components/result/three/flower/FlowerHead";
import FlowerRoot from "@/components/result/three/flower/FlowerRoot";
import Vase from "@/components/result/three/flower/Vase";

export default {
  name: "ThreeFlower",
  props: {
    f1_scale: { type: Number },
    f1_open: { type: Number },
    f1_petalShape: { type: Number },
    f1_petalNum: { type: Number },
    f1_color: { type: String },
    f2_enable: { type: Boolean },
    f2_scale: { type: Number },
    f2_open: { type: Number },
    f2_petalShape: { type: Number },
    f2_petalNum: { type: Number },
    f2_color: { type: String },
    f3_enable: { type: Boolean },
    f3_scale: { type: Number },
    f3_open: { type: Number },
    f3_petalShape: { type: Number },
    f3_petalNum: { type: Number },
    f3_color: { type: String },
    leafNum: { type: Number },
    rootLength: { type: Number },
    rootWave: { type: Number },
    flowerData: { type: Object }
  },

  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      flowerGroup: null,
      flowerHead: null,
      flowerHead2: null,
      flowerHead3: null,
      flowerRoot: null,
      vase: null,
      clock: null
    };
  },

  mounted() {
    this.init();
    this.animate();
  },

  methods: {
    init: function() {
      this.clock = new Three.Clock();
      let container = this.$refs.canvas;

      this.camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      this.camera.updateProjectionMatrix();
      this.camera.position.set(0, 0, 1);
      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.autoClear = false;
      this.renderer.setClearColor(0x000000, 0.0);
      container.appendChild(this.renderer.domElement);

      this.scene = new Three.Scene();
      var ambientLight = new Three.AmbientLight(0x999999);
      this.scene.add(ambientLight);

      var lights = [];
      lights[0] = new Three.DirectionalLight(0xffffff, 1);
      lights[0].position.set(1, 0, 0);
      lights[1] = new Three.DirectionalLight(0x11e8bb, 1);
      lights[1].position.set(0.75, 1, 0.5);
      lights[2] = new Three.DirectionalLight(0x8200c9, 1);
      lights[2].position.set(-0.75, -1, 0.5);
      this.scene.add(lights[0]);
      this.scene.add(lights[1]);
      this.scene.add(lights[2]);

      window.addEventListener("resize", this.onWindowResize, false);

      this.threeControls = new OrbitControls(this.camera, container);
      this.flowerGroup = new Three.Object3D();
      this.scene.add(this.flowerGroup);
      this.flowerGroup.position.y = this.flowerData.rootLength - 1;

      this.flowerRoot = new FlowerRoot(this.scene, this.flowerData);
      this.flowerRoot.init();

      this.flowerHead = new FlowerHead(this.flowerData);
      this.flowerHead.init();
      this.flowerHead2 = new FlowerHead(this.flowerData);
      this.flowerHead2.init();
      this.flowerHead3 = new FlowerHead(this.flowerData);
      this.flowerHead3.init();

      this.flowerGroup.add(this.flowerHead.bud);

      var vase = new Vase(this.scene);
      vase.init();
    },

    onWindowResize: function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate: function() {
      let t = this.clock.getElapsedTime();
      requestAnimationFrame(this.animate);
      this.flowerHead.drawLine();
      this.flowerHead2.drawLine();
      this.flowerHead3.drawLine();

      this.flowerRoot.animateLine();
      this.flowerRoot.leaf.animateLine();

      this.flowerGroup.rotation.y += 0.01;
      this.flowerRoot.rootGroup.rotation.y += 0.01;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
  },

  watch: {
    //GUI
    f1_scale: function(v) {
      this.flowerHead.setScale(v);
    },
    f1_open: function(v) {
      this.flowerHead.setOpen(v);
    },

    f1_petalShape: function(v) {
      this.flowerHead.updatePetal(this.f1_petalNum, v);
    },

    f1_petalNum: function(v) {
      this.flowerHead.updatePetal(v, this.f1_bendZ);
    },

    f1_color: function(v) {
      this.flowerHead.updateColor(v);
    },

    //flower layer 2
    f2_enable: function(enable) {
      if (enable) {
        this.flowerGroup.add(this.flowerHead2.bud);
      } else {
        this.flowerGroup.remove(this.flowerHead2);
      }
    },

    f2_scale: function(v) {
      this.flowerHead2.setScale(v);
    },
    f2_open: function(v) {
      this.flowerHead2.setOpen(v);
    },

    f2_petalShape: function(v) {
      this.flowerHead2.updatePetal(this.f2_petalNum, v);
    },

    f2_petalNum: function(v) {
      this.flowerHead2.updatePetal(v, this.f2_bendZ);
    },
    f2_color: function(v) {
      this.flowerHead2.updateColor(v);
    },

    //layer3
    f3_enable: function(v) {
      if (v) {
        this.flowerGroup.add(this.flowerHead3.bud);
      } else {
        this.flowerGroup.remove(this.flowerHead3.bud);
      }
    },
    f3_scale: function(v) {
      this.flowerHead3.setScale(v);
    },
    f3_open: function(v) {
      this.flowerHead3.setOpen(v);
    },

    f3_petalShape: function(v) {
      this.flowerHead3.updatePetal(this.f3_petalNum, v);
    },

    f3_petalNum: function(v) {
      this.flowerHead3.updatePetal(v, this.f3_bendZ);
    },

    f3_color: function(v) {
      this.flowerHead3.updateColor(v);
    },

    //leaf
    leafNum: function(v) {
      this.flowerRoot.updateLeaf(v);
    },
    rootLength: function(v) {
      this.flowerRoot.makeRoot(this.leafNum, v, this.rootWave);
      this.flowerGroup.position.y = v - 1;
    },
    rootWave: function(v) {
      this.flowerRoot.makeRoot(this.leafNum, this.rootLength, v);
    }
  }
};
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}

#mb-result-ThreeContainer {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: -moz-linear-gradient(
    top,
    #ffddb7 0%,
    #11e8bb 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #ffddb7 0%,
    #11e8bb 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffddb7 0%,
    #11e8bb 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#11e8bb', endColorstr='#8200c9',GradientType=0 ); /* IE6-9 */
}
</style>