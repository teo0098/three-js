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

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 'green',
  wireframe: true,
});

const controls = new OrbitControls(camera, renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 3, 32, 32),
  cubeMaterial,
);

plane.rotation.x = Math.PI / 2;

const group = new THREE.Group();
group.add(plane);

scene.add(group);

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
