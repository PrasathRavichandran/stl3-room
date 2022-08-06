import * as THREE from 'three';

import Sizes from './Utils/sizes';
import Time from './Utils/time';

import Camera from './camera';
import Renderer from './Renderer';

export default class Experience {
    static instance;

    constructor(canvas) {

        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.times = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();

        this.times.on('update', () => {
            this.update();
        })

        this.sizes.on('resize', () => {
            this.resize();
        })
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
    }
}