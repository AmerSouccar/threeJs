import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new Three.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0,2,5);
orbit.update();

const boxGeometry = new Three.BoxGeometry();
const boxMaterial = new Three.MeshBasicMaterial({color:0x00FF00});
const box = new Three.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planeGeometry = new Three.PlaneGeometry(30,30);
const planeMaterial = new Three.MeshStandardMaterial({color:0xFFFFFF,side:Three.DoubleSide});
const plane = new Three.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true; 

const gridHelper = new Three.GridHelper(30,100);
scene.add(gridHelper);


const sphereGeometry = new Three.SphereGeometry(4,100,100);
const sphereMaterial = new Three.MeshStandardMaterial({color:0x0000FF,wireframe:false});
const sphere = new Three.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.castShadow = true;


const gui = new dat.GUI();


const options = {
    sphereColor : '#ffea00',
    wireframe : false,
    speed : 0.01
};

gui.addColor(options,'sphereColor').onChange(function(e)
{
    sphere.material.color.set(e);
});

gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options,'speed',0,0.1);


const ambientLight = new Three.AmbientLight(0x333333);
scene.add(ambientLight);


const directionalLight = new Three.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);

directionalLight.position.set(-30,50,5);
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 12;


const dLightHelper = new Three.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);


const dLightShadowHelper = new Three.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);


let step = 0;


function animate(time)
{
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene,camera);
}


renderer.setAnimationLoop(animate);

