import * as THREE from 'three';

import Sizes from './Utils/sizes';
import Time from './Utils/time';
import Resources from './Utils/resources';
import assets from './Utils/assets';

import Camera from './camera';
import Renderer from './Renderer';
import World from './World/World';

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
        this.resources = new Resources(assets);
        this.world = new World();

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