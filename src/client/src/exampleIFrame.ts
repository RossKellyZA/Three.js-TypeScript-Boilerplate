import * as THREE from 'three';
import { Vector3 } from 'three';
import THREExHtmlMixer from './threex.htmlmixer';

export default class ExampleIFrame {
    private _mixerContext: any;
    private _url: any;
    private _position: Vector3;

    //Examples
    //https://github.com/jeromeetienne/threex.htmlmixer
    //http://jeromeetienne.github.io/threex.htmlmixer/examples/demo.html#threex

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, url: string, position: THREE.Vector3) {

        this._mixerContext = new THREExHtmlMixer.Context(renderer, scene, camera);
        this._url = url;
        this._position = position;
    
        //////////////////////////////////////////////////////////////////////////////////
        //		mixerContext configuration and dom attachement
        //////////////////////////////////////////////////////////////////////////////////
    
        // set up rendererCss
        let rendererCss		= this._mixerContext.rendererCss;
        rendererCss.setSize( window.innerWidth, window.innerHeight );
        // set up rendererWebgl
        let rendererWebgl	= this._mixerContext.rendererWebgl;
    
        let css3dElement		= rendererCss.domElement;
        css3dElement.style.position	= 'absolute';
        css3dElement.style.top		= '0px';
        css3dElement.style.width	= '100%';
        css3dElement.style.height	= '100%';
        document.body.appendChild( css3dElement );
        
        let webglCanvas			= rendererWebgl.domElement;
        webglCanvas.style.position	= 'absolute';
        webglCanvas.style.top		= '0px';
        webglCanvas.style.width		= '100%';
        webglCanvas.style.height	= '100%';
        webglCanvas.style.pointerEvents	= 'none';
        css3dElement.appendChild( webglCanvas );
    
        //let url		= 'https://mobile-app1-techinc1.installprogram.eu/htmlGames/3.16.0/launch/thunderstruckIIDesktop_TheForce_3_4_1_35/mgs/thunderstruckIIDesktop?displayName=Thunderstruck+II&moduleId=12772&clientId=50300&clientTypeId=70&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-techinc1.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=&currencyFormat=&isPracticePlay=False&username=DeathWish31&password=test1234$&formFactor=desktop';
        let domElement	= document.createElement('iframe');
        domElement.src	= url;
        domElement.style.border	= 'none';
        //css3dElement.appendChild(domElement); //added this
        //webglCanvas.appendChild(domElement); //added this
    
        // create the plane
        let mixerPlane	= new THREExHtmlMixer.Plane(this._mixerContext, domElement)
        mixerPlane.object3d.scale.multiplyScalar(2.5);
        mixerPlane.object3d.position.x =  this._position.x;
        mixerPlane.object3d.position.y =  this._position.y;
        mixerPlane.object3d.position.z =  this._position.z;
        scene.add(mixerPlane.object3d);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    public update(){
        this._mixerContext.update();
    }

    public onWindowResize(){
        this._mixerContext.rendererCss.setSize( window.innerWidth, window.innerHeight );
    }
}