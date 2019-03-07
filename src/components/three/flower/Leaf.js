/* eslint-disable */
import * as THREE from 'three';
import MeshLine from 'three.meshline';

export default class Leaf {
    constructor(root) {
        this.root = root;
        this.leaf = null;
        this.leafs = [];
        this.leafGroup = null;
        this.points = null;
    }

    init(){
        this.leafGroup = new THREE.Object3D();
        this.leafGroup.name = "leafgroup";
        this.makeLeaf();

    }

    reset(){
        if (this.leafs != []) {
            this.leafs = [];
            for (var i = this.leafGroup.children.length - 1; i >= 0; i--) {
                this.leafGroup.remove(this.leafGroup.children[i]);
            }
        }
    }

    updateLeafs(num, points){
        if(points!=null) this.points = points;

        this.reset();


        for(var i = 0; i<num; i++){
            let p = this.leaf.clone();
            //set position randon
            let randomPos = THREE.Math.randInt(5, this.points.length-20);
            let randomSize = THREE.Math.randFloat(0.3,1);

            p.position.copy(this.points[randomPos]);
            p.rotation.x = Math.PI/2 - Math.random()/i;
            p.rotation.z = Math.PI/i + Math.random() * i;
            p.scale.set(randomSize,randomSize,randomSize);
    
            p.name = "leaf" + i;
            this.leafs.push(p);
            this.leafGroup.add(p);
           
         } 
         this.root.add(this.leafGroup);
    }

    makeLeaf(){
        var curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( -0.1, 0.3, 0 ),
            new THREE.Vector3( 0, 0.5, -0.1 ),
            new THREE.Vector3( 0.1, 0.3, 0 ),
            new THREE.Vector3( 0, 0, 0)
        ] );

        const points = new THREE.Geometry().setFromPoints(curve.getPoints(30));
        this.leaf = this.makeLine( points, 0x058962 );
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
            lineWidth: 0.01,
            dashArray: 3, // always has to be the double of the line
            dashOffset: 0, // start the dash at zero
            dashRatio: 0.5 // visible length range min: 0.99, max: 0.5
        });
        var line = new THREE.Mesh(g.geometry, material);
        line.geometry.verticesNeedUpdate = true;
        line.material.needsUpdate = true;

        return line;
    }

    animateLine(){
        if(this.leafs != []){
        this.leafs.forEach(function(p, index) {
            if (p.material.uniforms.dashOffset.value < -1) return;
                p.material.uniforms.dashOffset.value -= 0.002;
            });
        }
    }

    setScale(v){
        this.mesh.scale.set(v,v,v);
    }

}