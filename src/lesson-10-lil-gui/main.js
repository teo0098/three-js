import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('pink');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.world'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 'green',
  wireframe: true,
});

const controls = new OrbitControls(camera, renderer.domElement);

let plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 3, 32, 32), cubeMaterial);

plane.rotation.x = Math.PI / 2;

const group = new THREE.Group();
group.add(plane);

scene.add(group);

const gui = new GUI();

const sizeSettings = { size: 1, y: Math.PI };
const sizeFolder = gui.addFolder('Size/Position');
sizeFolder.add(sizeSettings, 'size', 0.1, 5, 0.1).onChange((value) => {
  plane.scale.set(value, value, value);
});
sizeFolder.add(sizeSettings, 'y', 1, 20, 0.1).onChange((value) => {
  plane.rotation.set(value, value, value);
});

const colorSettings = { color: '#00ff00', background: scene.background };
const colorFolder = gui.addFolder('Colors');
colorFolder.addColor(colorSettings, 'color').onChange((value) => {
  plane.material.color.set(value);
});
colorFolder.addColor(colorSettings, 'background').onChange((value) => {
  scene.background = new THREE.Color(value);
});

const visibilitySettings = { visible: true };
const visibilityFolder = gui.addFolder('Visibility');
visibilityFolder.add(visibilitySettings, 'visible').onChange((value) => {
  plane.visible = value;
});

const shapeOptions = { Cube: 'cube', Sphere: 'sphere', Cylinder: 'cylinder' };
const shapeSettings = { shape: 'cube' };
const shapeFolder = gui.addFolder('Shapes');

shapeFolder.add(shapeSettings, 'shape', shapeOptions).onChange((value) => {
  scene.remove(plane); // Remove previous shape

  let geometry;
  if (value === 'cube') geometry = new THREE.BoxGeometry();
  if (value === 'sphere') geometry = new THREE.SphereGeometry(0.7, 32, 32);
  if (value === 'cylinder')
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

  plane = new THREE.Mesh(geometry, cubeMaterial);
  scene.add(plane);
});

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
