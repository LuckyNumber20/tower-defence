// 1. Create the Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background

// 2. Set up the Camera (Field of view, Aspect ratio, Near clip, Far clip)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Position the camera slightly up and pulled back to look down at the map
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

// 3. Set up the Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// 5. Create the Map (A flat green plane)
const geometryPlane = new THREE.PlaneGeometry(30, 30);
const materialPlane = new THREE.MeshLambertMaterial({ color: 0x2ecc71 }); // Green
const floor = new THREE.Mesh(geometryPlane, materialPlane);
floor.rotation.x = -Math.PI / 2; // Rotate it to lay flat
scene.add(floor);

// 6. Add a placeholder "Tower" (A grey cube)
const geometryCube = new THREE.BoxGeometry(2, 4, 2);
const materialCube = new THREE.MeshLambertMaterial({ color: 0x7f8c8d });
const tower = new THREE.Mesh(geometryCube, materialCube);
tower.position.y = 2; // Lift it up so it sits on the floor
scene.add(tower);

// 7. The Animation Loop (Draws the scene every frame)
function animate() {
    requestAnimationFrame(animate);
    
    // Let's add a slow spin to the tower just to prove it's 3D!
    tower.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the engine
animate();
