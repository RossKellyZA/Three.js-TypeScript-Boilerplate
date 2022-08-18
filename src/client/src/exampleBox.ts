import * as THREE from 'three'

export default class Box {
    private geometry: THREE.BoxGeometry;
    private material: THREE.MeshBasicMaterial;
    private _color: THREE.ColorRepresentation;
    private _cube: THREE.Mesh;
    private _renderer: THREE.WebGLRenderer;

    constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, color: THREE.ColorRepresentation, position: THREE.Vector3) {

        this._color = color;
        this._renderer = renderer

        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshBasicMaterial({
            color: this._color,
            wireframe: true,
        });

        this._cube = new THREE.Mesh(this.geometry, this.material);
        this._cube.position.x = position.x;
        this._cube.position.y = position.y;
        this._cube.position.z = position.z;

        renderer.setAnimationLoop(this.update);
    }

    public getbox() {
        return this._cube;
    }

    public update() {
        this._cube.rotation.x += 0.01;
        this._cube.rotation.y += -0.01;
    }
}