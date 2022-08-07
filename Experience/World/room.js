import * as THREE from 'three';

import Experience from "../experience";

export default class Room {

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel();
    }

    setModel() {

        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name === 'Platform_Base') {
                child.material = new THREE.MeshBasicMaterial({ map: this.resources.items.woodTwo });

                const textureImg = document.querySelectorAll('.controller-img');

                textureImg?.forEach(item => {
                    item.onclick = () => {
                        child.material.map = this.resources.items[item.getAttribute('data-img-id')];
                    }
                })
            }

        })
        this.scene.add(this.actualRoom);
    }

    resize() {
    }

    update() {

    }

}
