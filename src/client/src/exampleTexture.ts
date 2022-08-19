import * as THREE from 'three'

export default class ExampleTexture {

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        const planeGeometry = new THREE.PlaneGeometry(2, 1);
        const material = new THREE.MeshPhongMaterial();
        const texture = new THREE.TextureLoader().load('./assets/textures/worldColour.5400x2700.jpg');
        material.map = texture;
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = -2;
        scene.add(plane);
    }
}