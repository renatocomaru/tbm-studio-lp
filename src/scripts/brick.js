import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(1.3, 300 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(200, 200);
  document.getElementById("3d-brick").appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const textures = {
    albedo: textureLoader.load("/src/assets/textures/red-clay-wall-albedo.png"),
    ao: textureLoader.load("/src/assets/textures/red-clay-wall-ao.png"),
    height: textureLoader.load("/src/assets/textures/red-clay-wall-height.png"),
    metalness: textureLoader.load(
      "/src/assets/textures/red-clay-wall-metallic.png"
    ),
    normal: textureLoader.load(
      "/src/assets/textures/red-clay-wall-normal-ogl.png"
    ),
    rough: textureLoader.load(
      "/src/assets/textures/red-clay-wall-roughness.png"
    ),
  };

  const loader = new GLTFLoader();
  loader.load(
    "/src/assets/3d/brick1.gltf",
    (gltf) => {
      const object = gltf.scene;

      object.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.albedo,
            aoMap: textures.ao,
            normalMap: textures.normal,
            roughnessMap: textures.rough,
            metalnessMap: textures.metalness,
            // displacementMap: textures.height,
            // displacementScale: 0.000000001,
          });
        }
      });

      object.scale.set(1, 1, 1); // Increase the scale of the object
      scene.add(object);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        object.rotation.y += 0.02; // Rotate the object
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );

  const light = new THREE.DirectionalLight(0xbc4a3c, 5);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x242424);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2);
  pointLight.position.set(1, 1, 1);
  scene.add(pointLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 10, 10);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.castShadow = true;
  scene.add(spotLight);

  const adjustCamera = () => {
    if (window.innerWidth < 768) {
      renderer.setSize(200, 200);
      camera.position.z = 8;
    } else if (window.innerWidth <= 1367) {
      renderer.setSize(250, 250);
      camera.position.z = 8;
    } else {
      renderer.setSize(300, 300);
      camera.position.z = 8;
    }
  };

  adjustCamera();
  window.addEventListener("resize", adjustCamera);

  // camera.position.z = 8;
});
