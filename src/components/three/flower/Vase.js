/* eslint-disable */
import * as THREE from "three";

export default class Vase {
  constructor(scene, posY) {
    this.scene = scene;
    this.vase = null;
    this.color = null;
  }

  init(posY) {
    var curve = new THREE.SplineCurve([
      new THREE.Vector2(0.1, 0),
      new THREE.Vector2(0.2, 0.2),
      new THREE.Vector2(0.3, 0.5),
      new THREE.Vector2(0.15, 0.7),
      new THREE.Vector2(0.2, 0.8)
    ]);

    const points = curve.getPoints(20);

    var geometry = new THREE.LatheGeometry(points, 12, 0, Math.PI * 2);

    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      shininess: 0.1
    });

    this.vase = new THREE.Mesh(geometry, material);
    this.vase.name = "vase";
    this.vase.position.y = -1.5;
    this.scene.add(this.vase);
  }
}
