import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const gui = new GUI();

const config = {
  wireframe: false,
  visibleToggle: function () {
    sphere.visible = !sphere.visible;
  },
  color: '#00ff00', // Add a color property
};

gui.add(config, 'wireframe');
gui.addColor(config, 'color');
gui.add(config, 'visibleToggle');

// Canvas
const canvas = document.querySelector('canvas.world');

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Create a geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial();
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // change with lil-gui
  sphere.material.color.set(config.color);
  sphere.material.wireframe = config.wireframe;

  controls.update(); // Update the controls

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
