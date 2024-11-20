

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load a texture for the cube's faces
const loader = new THREE.TextureLoader();
const texture = loader.load('454347165_7963390367088783_3223855902742788755_n.jpg');

// Create a cube with texture
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set camera position
camera.position.z = 5;

// Rotation variables
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Mouse events
document.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;

  cube.rotation.y -= deltaX * 0.01; // Inverted horizontal rotation
  cube.rotation.x -= deltaY * 0.01; // Inverted vertical rotation

  previousMousePosition = { x: event.clientX, y: event.clientY };
});

// Debug UI (dat.GUI)
const gui = new dat.GUI();
const cubeSettings = {
  rotationSpeedX: 0.01,
  rotationSpeedY: 0.01,
  toggleWireframe: false,
};

// Add rotation speed controls
gui.add(cubeSettings, 'rotationSpeedX', 0, 0.1).name('Rotation Speed X');
gui.add(cubeSettings, 'rotationSpeedY', 0, 0.1).name('Rotation Speed Y');

// Add wireframe toggle
gui.add(cubeSettings, 'toggleWireframe').name('Wireframe').onChange((value) => {
  cube.material.wireframe = value;
});

// Add elevation control
gui.add(cube.position, 'y') // Adjusts cube's Y position
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Elevation');

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Apply rotation speeds
  cube.rotation.x += cubeSettings.rotationSpeedX;
  cube.rotation.y += cubeSettings.rotationSpeedY;

  renderer.render(scene, camera);
}

animate();
