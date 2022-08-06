import * as THREE from 'three';

import Experience from "../experience";
import Environment from './environment';
import Room from './room';

export default class World {

    // The camera need size, scenes
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;

        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            this.environment = new Environment();
            this.room = new Room();
        })
    }

    resize() {
    }

    update() {
    }

}
