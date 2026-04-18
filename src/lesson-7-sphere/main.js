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
  color: 'cyan',
  wireframe: true,
});

const controls = new OrbitControls(camera, renderer.domElement);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
  cubeMaterial,
);

const group = new THREE.Group();
group.add(sphere);

scene.add(group);

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Update the controls
  renderer.render(scene, camera);
}

animate();
