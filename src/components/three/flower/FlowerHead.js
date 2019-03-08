/* eslint-disable */
import * as THREE from "three";
import MeshLine from "three.meshline";

export default class FlowerHead {
  constructor(scene) {
    this.scene = scene;
    this.petal = null;
    this.petals = [];
    this.bud = null;
    this.color = null;
    this.petalOpen = -0.5;
  }

  init() {
    this.bud = new THREE.Object3D();
    this.bud.name = "bud";
    this.scene.add(this.bud);
    this.bud.rotation.x = Math.PI / 2;
    this.makeBud(0.1, 5);
  }


  curvePoints(v) {
    let points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.1, 0.3, v),
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(0.1, 0.3, v),
      new THREE.Vector3(0, 0, 0)
    ];
    return points;
  }

  makePetal(bendV) {
    var curve = new THREE.CatmullRomCurve3(this.curvePoints(bendV));
    const points = new THREE.Geometry().setFromPoints(curve.getPoints(50));
    this.petal = this.makeLine(points, this.color);
  }

  makeBud(bendV, num) {
    this.makePetal(bendV);

    for (var i = 0; i < num; i++) {
      let p = this.petal.clone();
      p.rotation.x = -Math.PI / 5;

      this.petals.push(p);

      let po = new THREE.Object3D();
      po.add(p);

      po.rotation.z = (Math.PI / num) * i * 2;
      p.rotation.x = this.petalOpen != null ? this.petalOpen : 0;

      po.name = "petal" + i;
      this.bud.add(po);
    }
  }

  updatePetal(bendV, num) {
    if (this.petals != []) {
      this.petals = [];
      for (var i = this.bud.children.length - 1; i >= 0; i--) {
        this.bud.remove(this.bud.children[i]);
      }
    }
    this.makeBud(bendV, num);
  }

  makeLine(geo, c) {
    var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    var g = new MeshLine.MeshLine();
    g.setGeometry(geo);

    var material = new MeshLine.MeshLineMaterial({
      useMap: false,
      transparent: true,
      color: new THREE.Color(c),
      resolution: resolution,
      sizeAttenuation: !false,
      lineWidth: 0.01,
      dashArray: 2, // always has to be the double of the line
      dashOffset: 0, // start the dash at zero
      dashRatio: 0.5 // visible length range min: 0.99, max: 0.5
    });

    var line = new THREE.Mesh(g.geometry, material);
    line.geometry.verticesNeedUpdate = true;
    line.material.needsUpdate = true;

    return line;
  }

  updateColor(color) {
    this.color = color;
    this.petals.forEach(function(p) {
      p.material.color.set(color);
    });
  }

  drawLine() {
    if(this.petals != []){
    this.petals.forEach(function(p) {
        if (p.material.uniforms.dashOffset.value < -1) return;
            p.material.uniforms.dashOffset.value -= 0.002;
        });
    }
  }
  
  animateLine(t){
    if(this.petals != []){
        this.petals.forEach(function(p, index) {
            p.material.uniforms.lineWidth.value = .02 * Math.sin(0.05 * t + index*0.2);
        });
    }
}

  setScale(v) {
    this.petals.forEach(function(p) {
      p.scale.set(v, v, v);
    });
  }

  setOpen(v) {
    this.petalOpen = v;
    this.petals.forEach(function(p) {
      p.rotation.x = v;
    });
  }
}
