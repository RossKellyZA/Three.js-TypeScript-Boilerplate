import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import ExampleBox from './src/exampleBox';
import ExampleSound from './src/exampleSound';
import ExampleTexture from './src/exampleTexture';
import ExampleIFrame from './src/exampleIFrame';
import { Vector3 } from 'three';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let stats: Stats;

let iframe1: ExampleIFrame;
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
    document.body.appendChild(VRButton.createButton(renderer));

    stats = Stats();  
    document.body.appendChild(stats.dom);

    //Example Content
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    setupIFrames();

    setupCubes();
    setupTexture();
    setupSound();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onWindowClick, false);

    renderer.setAnimationLoop(update);
}

function setupIFrames(){
  iframe1 = new ExampleIFrame(renderer, 
    scene, 
    camera,
    'https://threejs.org/', 
    new Vector3(0,2.8,-2));
}

function setupCubes(){
    
    cube1 = new ExampleBox(scene, new THREE.Color("rgb(255, 0, 0)"), new THREE.Vector3(-2, 1, -2));
    scene.add(cube1.getbox());

    cube2 = new ExampleBox(scene, new THREE.Color("rgb(0, 255, 0)"), new THREE.Vector3(0, 1, -2));
    scene.add(cube2.getbox());

    cube3 = new ExampleBox(scene, new THREE.Color("rgb(0, 0, 255)"), new THREE.Vector3(2, 1, -2));
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

    iframe1.update();

    cube1.update();
    cube2.update();
    cube3.update();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    iframe1.onWindowResize();
}

function onWindowClick() {
    sound.playSound();
}
