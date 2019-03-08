/* eslint-disable */
import * as THREE from 'three';
import MeshLine from 'three.meshline';
import Leaf from '@/components/three/flower/Leaf'

export default class FlowerRoot {
    constructor(scene) {
        this.scene = scene;
        this.root = null;
        this.rootGroup = null;
        this.leaf = null;
    }

    init(){
        this.rootGroup = new THREE.Object3D;
        this.leaf =  new Leaf(this.rootGroup);
        this.leaf.init();
        this.makeRoot(3,1);
       
    }

    checkReset(){
        if(this.rootGroup.children.length > 0) {
            for (var i = this.rootGroup.children.length - 1; i >= 0; i--) {
                this.rootGroup.remove(this.rootGroup.children[i]);
            }
        }
    }

    curvePoints(l, w){
        console.log(w);
        let points = [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( -0.05*w, -l*0.25, 0.01*w ),
            new THREE.Vector3( 0, -l*0.5, 0.05*w ),
            new THREE.Vector3( 0.05*w, -l*0.75, -0.01*w),
            new THREE.Vector3( 0, -l, 0)
        ]
       return points; 
    }

    updateLeaf(v){
        this.leaf.updateLeafs(v);
    }

    makeRoot(leafNum, rootLength, rootWave){
        this.checkReset();
        var curve = new THREE.CatmullRomCurve3(this.curvePoints(rootLength,rootWave));
        const points = new THREE.Geometry().setFromPoints(curve.getPoints(50));
        this.root =  this.makeLine( points, 0x058962 );
        this.root.name = "rootLine";
        this.rootGroup.add( this.root );
        this.leaf.updateLeafs(leafNum, points.vertices);
        this.scene.add(this.rootGroup);
    }

    makeLine( geo, c ) {
        var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
        var g = new MeshLine.MeshLine();
        g.setGeometry( geo );

        var material = new MeshLine.MeshLineMaterial( {
            useMap: false,
            transparent: true,
            color: new THREE.Color( c ),
            resolution: resolution,
            sizeAttenuation: !false,
            lineWidth: 0.02,
            dashArray: 2, // always has to be the double of the line
            dashOffset: 0, // start the dash at zero
            dashRatio: 0.5 // visible length range min: 0.99, max: 0.5
        });

        var line = new THREE.Mesh(g.geometry, material);
        line.material.needsUpdate = true;

        return line;
        
    }

    animateLine() {
       // this.root.material.uniforms.lineWidth.value = .2 * Math.sin(0.02 * t);

        if(this.root != null){
            if (this.root.material.uniforms.dashOffset.value > 1) return;
            this.root.material.uniforms.dashOffset.value += 0.02;
        
        } 
       
    }

    setScale(v){
        this.root.scale.set(v,v,v);
    }

}