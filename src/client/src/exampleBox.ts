import * as THREE from 'three'

export default class Box {
    private geometry: THREE.BoxGeometry;
    private material: THREE.MeshBasicMaterial;
    private _color: THREE.ColorRepresentation;
    private _cube: THREE.Mesh;

    constructor(scene: THREE.Scene, color: THREE.ColorRepresentation, position: THREE.Vector3) {

        this._color = color;

        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshBasicMaterial({
            color: this._color,
            wireframe: true,
        });

        this._cube = new THREE.Mesh(this.geometry, this.material);
        this._cube.position.x = position.x;
        this._cube.position.y = position.y;
        this._cube.position.z = position.z;
    }

    public getbox() {
        return this._cube;
    }

    public update() {
        this._cube.rotation.x += 0.01;
        this._cube.rotation.y += -0.01;
    }
}