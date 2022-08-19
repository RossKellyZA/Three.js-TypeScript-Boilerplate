import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import ExampleBox from './src/exampleBox';
import ExampleSound from './src/exampleSound';
import ExampleTexture from './src/exampleTexture';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let stats: Stats;

let cube1: ExampleBox;
let cube2: ExampleBox;
let cube3: ExampleBox;
let texture: ExampleTexture
let sound: ExampleSound;

init();

function init() {
    scene = new THREE.Scene();

    //Setup Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer))

    stats = Stats();  
    document.body.appendChild(stats.dom);

    //Example Content
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    setupCubes();
    setupTexture();
    setupSound();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onWindowClick, false);
    renderer.setAnimationLoop(update);
}

function setupCubes(){
    
    cube1 = new ExampleBox(scene, new THREE.Color("rgb(255, 0, 0)"), new THREE.Vector3(-2, 1.6, -2));
    scene.add(cube1.getbox());

    cube2 = new ExampleBox(scene, new THREE.Color("rgb(0, 255, 0)"), new THREE.Vector3(0, 1.6, -2));
    scene.add(cube2.getbox());

    cube3 = new ExampleBox(scene, new THREE.Color("rgb(0, 0, 255)"), new THREE.Vector3(2, 1.6, -2));
    scene.add(cube3.getbox());
}

function setupTexture(){
    texture = new ExampleTexture(scene, camera);
}

function setupSound(){
    sound = new ExampleSound(scene, camera);
}

function update() {

    stats.update();

    cube1.update();
    cube2.update();
    cube3.update();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onWindowClick() {
    sound.playSound();
}




