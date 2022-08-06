import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Experience from "./experience";

export default class Camera {

    // The camera need size, scenes
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;

        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();

        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(10, this.sizes.width / this.sizes.height, 0.1, 150)
        this.perspectiveCamera.rotation.reorder('YXZ')
        this.perspectiveCamera.position.set(15, 15, 15);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.maxAzimuthAngle = Math.PI / 2;
        this.controls.minAzimuthAngle = Math.PI / 8;

        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minPolarAngle = Math.PI / 8;
        
        this.controls.screenSpacePanning = true;
        this.controls.enableKeys = false;
        this.controls.zoomSpeed = 0.25;
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }

}
