import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(1, 300 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(300, 300);
  document.getElementById("3d-brick").appendChild(renderer.domElement);
  const light = new THREE.DirectionalLight(0xfee8d6, 2.5, 50, 2);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
  const loader = new GLTFLoader();
  loader.load(
    "/src/assets/3d/brick1.gltf",
    (gltf) => {
      const object = gltf.scene;
      object.scale.set(1, 1, 1); // Increase the scale of the object
      scene.add(object);
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        object.rotation.y += 0.01; // Rotate the object
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );
  camera.position.z = 10;
});
