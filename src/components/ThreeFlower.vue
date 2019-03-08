

<template>
    <div id="three-flower"></div>
</template>

<script>

/* eslint-disable */
import * as Three from 'three'
import OrbitControls from '@/utils/OrbitControls';
import FlowerHead from '@/components/three/flower/FlowerHead'
import FlowerRoot from '@/components/three/flower/FlowerRoot'
import Vase from '@/components/three/flower/Vase'

export default {
  name: 'ThreeFlower',
  props:{
    f1_scale: { type: Number }, // { x, y, z }'
    f1_open: { type: Number }, // { x, y, z }
    f1_bendZ: {type: Number},
    f1_petalNum: {type: Number},
    f2_scale: { type: Number }, // { x, y, z }'
    f2_open: { type: Number }, // { x, y, z }
    f2_bendZ: {type: Number},
    f2_petalNum: {type: Number},
    leafNum: {type: Number},    
    rootLength: {type: Number},
    rootWave: {type: Number},
    color: {type: String},
    dynamic:  {type: Number}
  },

  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      cube: null,
      flowerHead: null,
      flowerRoot: null,
      vase:null,
      clock:null,
      size: {
          w: window.innerWidth,
          h: window.innerHeight
      }
    }
  },

  methods: {
    init: function() {
       this.clock = new Three.Clock();
        let container = document.getElementById('three-flower');

        this.camera = new Three.PerspectiveCamera(70, this.size.w/this.size.h, 0.01, 100);
        this.camera.position.z = 1;

        this.scene = new Three.Scene();

        this.light = new Three.PointLight( 0xff0000, 1, 100 );

        this.scene.add(this.light);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.size.w, this.size.h);

        this.threeControls = new OrbitControls(this.camera, container);

        this.scene.background = new Three.Color( '#c4e9ff' );
        container.appendChild(this.renderer.domElement);

        this.flowerRoot =  new FlowerRoot(this.scene);
        this.flowerRoot.init();

        this.flowerHead =  new FlowerHead(this.scene);
        this.flowerHead.init();
        this.flowerHead2 =  new FlowerHead(this.scene);
        this.flowerHead2.init();

        var vase =  new Vase(this.scene);
        vase.init();
        
    },


  animate: function() {
    let t = this.clock.getElapsedTime();

        requestAnimationFrame(this.animate);
        this.flowerHead.drawLine();
       // this.flowerHead.animateLine(t);
        this.flowerRoot.animateLine()
        this.flowerRoot.leaf.animateLine();
    
        this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
      this.init();
      this.animate();
  },

  watch: {
    f1_scale: function(v) {
      console.log("size: " + v);
      this.flowerHead.setScale(v);
    },
    f1_open: function(v) {
      console.log("open: " + v);
      this.flowerHead.setOpen(v);
    },

    f1_bendZ: function(v) {
      console.log("petalCurve: " + v);
      this.flowerHead.updatePetal(v, this.f1_petalNum)
    },

    f1_petalNum: function(v) {
      console.log("petalNum: " + v);
      this.flowerHead.updatePetal(this.f1_bendZ, v)
    },

//layer2
    f2_scale: function(v) {
      // console.log("size: " + v);
      this.flowerHead2.setScale(v);
    },
    f2_open: function(v) {
      // console.log("open: " + v);
      this.flowerHead2.setOpen(v);
    },

    f2_bendZ: function(v) {
      // console.log("petalCurve: " + v);
      this.flowerHead2.updatePetal(v, this.f2_petalNum)
    },

    f2_petalNum: function(v) {
      // console.log("petalNum: " + v);
      this.flowerHead2.updatePetal(this.f2_bendZ, v)
    },

//leaf
    leafNum: function(v) {
      // console.log("leaflNum: " + v);
      this.flowerRoot.updateLeaf(v);
    },
    rootLength: function(v) {
      // console.log("rootLength: " + v);
      this.flowerRoot.makeRoot(this.leafNum, v, this.rootWave)
    },
    rootWave: function(v) {
     // console.log("rootWave: " + v);
      this.flowerRoot.makeRoot(this.leafNum, this.rootLength, v)
    },
    color: function(v) {
      // console.log("color: " + v);
      this.flowerHead.updateColor(v);
    },
    dynamic: function(v) {
      // console.log("color dynamic: " + v);
     // this.flowerRoot.updateLeaf(v);
    }
  }
}
</script>

<style>
#container{
  width: 100%;
  height: 100%;
}
</style>