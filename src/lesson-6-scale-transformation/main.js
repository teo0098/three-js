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
cube1.scale.set(2, 2, 2);
cube2.position.set(0, 0, 0);
cube2.scale.set(2, 0.5, 1);

const group = new THREE.Group();
group.add(cube1, cube2);

scene.add(group);

function animate() {
  requestAnimationFrame(animate);

  cube2.scale.x += 0.01;
  cube2.scale.y += 0.01;
  cube2.scale.z += 0.01;
  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
