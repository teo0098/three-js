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
const bouncingCube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 'red',
  }),
);

cube1.position.set(-1, -0.5, -1);
cube2.position.set(1, -0.5, -1);
bouncingCube.position.set(0, -0.5, -3);

const group = new THREE.Group();
group.add(cube1, cube2, bouncingCube);

scene.add(group);

// Animation for bouncing effect
let bounceSpeed = 0.03;
let direction = 1;

function animate() {
  requestAnimationFrame(animate);

  bouncingCube.position.y += bounceSpeed * direction;
  if (bouncingCube.position.y >= 2 || bouncingCube.position.y <= -0.5) {
    direction *= -1;
  }

  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
