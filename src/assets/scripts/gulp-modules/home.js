import * as THREE from 'three';
import {ColladaLoader} from './loaders/ColladaLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// console.log(ColladaLoader);

const loader = new ColladaLoader(  );




const container = document.getElementById( 'container' );
let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set( 0, 0, 50 );
    // camera.lookAt( 0, 3, 0 );
let scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );



// Update the mixer on each frame



// let mixer = undefined;
const clock = new THREE.Clock();
const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
				scene.add( ambientLight );
const controls = new OrbitControls(camera, renderer.domElement)
loader.load('./static/Animation.dae', (el) => {
    console.log(el);

    // scene.animations.push(el.animations);
    // console.log(scene.animations);
    let mesh = el.scene.children[0];
    const mixer = new THREE.AnimationMixer( mesh );
    const clips = el.animations;
    el.animations.forEach(( clip ) => {
        mixer.clipAction(clip).play();
    });

    scene.mixer = mixer;
    const updateAmount = 0.5;
        console.log(mixer);
    // if(typeof mixer !== "undefined") mixer.update(delta);
        scene.add(mesh);
        mixer.update(updateAmount)
        console.log(scene);

scene.children[1].material.map = new THREE.TextureLoader().load( "./assets/images/png-clipart-the-ultimate-doom-doomguy-gif-video-games-doomguy-face-game-face-thumbnail.png" );
});

container.appendChild( renderer.domElement );
console.log(loader);
window.clock = new THREE.Clock();
window.scene = scene;


// const textureLoader = new THREE.TextureLoader();
// textureLoader.load('./assets/images/flower-1.jpg', (el) => {
//     console.log(el);
//     const mat = new THREE.MeshBasicMaterial({
//         map: el,
//     });
//     scene.children[1].material = el;
//     scene.children[1].material.needsUpdate = true;

//     console.log(scene.children[1]);
// })





function render() {
    const delta = window.clock.getDelta();
    if (scene.mixer !== undefined) {
        scene.mixer.update(delta);
    }
    // console.log(Math.abs(Math.sin(clock.elapsedTime)) * 0.01);
    renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

animate();
