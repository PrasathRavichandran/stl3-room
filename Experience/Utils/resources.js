import * as THREE from 'three';

import { EventEmitter } from "events";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import Experience from "../experience";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();

        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};

        this.queue = this.assets.length;

        this.loaded = 0;

        this.setLoaders();
        this.startLoading();

    }

    setLoaders() {

        this.loaders = {};

        const loadingManager = new THREE.LoadingManager();
        const progressBar = document.getElementById('progress-bar');
        const loader = document.querySelector('.loader');

        loadingManager.onProgress = (url, loaded, total) => {
            progressBar.value = (loaded / total) * 100;
        }

        loadingManager.onLoad = () => {
            loader.style.display = 'none';
        }

        this.loaders.gltfLoader = new GLTFLoader(loadingManager);
        this.loaders.dracoLoader = new DRACOLoader();

        this.loaders.dracoLoader.setDecoderPath('/draco/');
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    };

    startLoading() {

        const renderElem = document.querySelector('.render-texture');

        for (const asset of this.assets) {
            if (asset.type === 'glbModel') {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            }
            else if (asset.type === 'texture') {

                let img = document.createElement('img');
                img.src = asset.path;
                img.className = "controller-img";
                img.dataset.imgId = asset.name;

                renderElem.appendChild(img);

                this.imageTexture = {};

                this.imageTexture[asset.name] = new THREE.TextureLoader().load(asset.path);
                this.imageTexture[asset.name].flipY = true;

                this.singleAssetLoaded(asset, this.imageTexture[asset.name]);
            }
        }
    };

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emit('ready');
        }
    }
}