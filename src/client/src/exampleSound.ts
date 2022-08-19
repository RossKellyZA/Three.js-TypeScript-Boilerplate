import * as THREE from 'three'

export default class ExampleSound {
    private _sound: THREE.Audio;

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener();
        camera.add( listener );

        // create a global audio source
        const sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( './assets/sounds/letsFightingLove.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.5 );
    });
        this._sound = sound;
    }

    public playSound() {
        if(!this._sound.isPlaying)
        {
            this._sound.play();      
        }
    }
}