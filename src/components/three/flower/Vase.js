/* eslint-disable */
import * as THREE from "three";

export default class Vase {
  constructor(scene) {
    this.scene = scene;
    this.vase = null;
    this.color = null;
  }

  init(){
    var curve = new THREE.SplineCurve([
        new THREE.Vector2( 0.1, 0),
        new THREE.Vector2( 0.2, 0.2),
        new THREE.Vector2( 0.3, 0.5),
        new THREE.Vector2( 0.15, 0.7),
        new THREE.Vector2( 0.2, 0.8)
    ]);

    const points = (curve.getPoints(20));

    var geometry = new THREE.LatheGeometry(points, 12, 0, Math.PI*2);

    var specularColor = new THREE.Color(1, 1, 1);
    var diffuseColor = new THREE.Color(1,1,1)
    var specularShininess = Math.pow( 1, 10 );

    var material = new THREE.MeshToonMaterial( {
        bumpScale: 1,
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.5,
        shininess: specularShininess,
        side: THREE.DoubleSide
    })

    this.vase = new THREE.Mesh( geometry, material );
    this.vase.name = "vase";
    this.vase.position.y = -1.5;
    this.scene.add( this.vase );

  }

}
