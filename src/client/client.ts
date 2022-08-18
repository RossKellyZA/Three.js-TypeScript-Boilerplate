import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { Int8Attribute } from 'three';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let cube: THREE.Mesh;
let stats: Stats;

init();

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    
    document.body.appendChild(renderer.domElement);

    setupCube();
    document.body.appendChild(VRButton.createButton(renderer))

    stats = Stats();  
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);

    renderer.setAnimationLoop(update);

}

function setupCube(){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1.6;
    cube.position.z = -2;
    scene.add(cube);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update() {

    updateCube();
    stats.update();

    renderer.render(scene, camera);
}

function updateCube(){
    cube.rotation.x += 0.01;
    cube.rotation.y += -0.01;
}



