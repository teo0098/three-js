import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'cyan' });

const controls = new OrbitControls(camera, renderer.domElement);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(), cubeMaterial);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(), cubeMaterial);

cube1.position.set(0, 0, -2);
cube1.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI);
cube2.position.set(0, 0, 0);

const group = new THREE.Group();
group.add(cube1, cube2);

scene.add(group);

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
