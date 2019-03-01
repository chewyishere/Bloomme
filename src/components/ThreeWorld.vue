<template>
    <div id="container"></div>
</template>

<script>
import * as Three from 'three'
import OrbitControls from '../utils/OrbitControls';

export default {
  name: 'ThreeWorld',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      cube: null,
      size: {
          w: window.innerWidth,
          h: window.innerHeight
      }
    }
  },


  methods: {
    init: function() {
        let container = document.getElementById('container');

        this.camera = new Three.PerspectiveCamera(70, this.size.w/this.size.h, 0.01, 100);
        this.camera.position.z = 1;

        this.scene = new Three.Scene();

      // Get Device Pixel Ratio first for retina

        let geometry = new Three.BoxGeometry(0.5,0.5,0.5);
        let material = new Three.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new Three.Mesh(geometry, material);

        this.scene.add(this.cube);

        this.light = new Three.PointLight( 0xff0000, 1, 100 );
        this.scene.add(this.light);
        
        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.size.w, this.size.h);

        this.threeControls = new OrbitControls(this.camera, container);

        this.scene.background = new Three.Color( '#c4e9ff' );
        container.appendChild(this.renderer.domElement);

    },

    animate: function() {
        requestAnimationFrame(this.animate);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
      this.init();

      this.animate();
      console.log(this.scene);
  }
}
</script>

<style>
#container{
  width: 100%;
  height: 100%;
}
</style>