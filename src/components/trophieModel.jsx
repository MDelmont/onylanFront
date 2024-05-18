import  { useRef, useEffect,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function TrophieModel({trophieModelData,modifyPosition}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Créer une scène Three.js
    let model =null;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(trophieModelData.camera.fov, 1, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(200, 200);
    containerRef.current.appendChild(renderer.domElement);
    if (trophieModelData.glbFile){

      const url = URL.createObjectURL(trophieModelData.glbFile);
    // Charger le modèle GLTF
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.2, 0.2, 0.2);
        model.position.set(0.5, 0.5, 0.5);


        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.material.color.set(trophieModelData.color); // Par exemple, rouge
          }
        });

        // Repèrez le centre actuel de la pièce
        const currentPosition = new THREE.Vector3();

        model.getWorldPosition(currentPosition);
        // Déterminez la nouvelle position souhaitée du centre des axes de la pièce
        const desiredPosition = new THREE.Vector3(trophieModelData.translation.x, trophieModelData.translation.y, trophieModelData.translation.z); // Par exemple, (0, 0, 0) pour le centre de la scène

        // Appliquez la différence à la position de la pièce pour la déplacer sans changer sa direction
        model.position.add(desiredPosition);
        model.rotation.set(trophieModelData.rotation.piece.x, trophieModelData.rotation.piece.y, trophieModelData.rotation.piece.z);
            scene.add(model);
          },
      undefined,
      (error) => {
        console.error('Erreur lors du chargement du modèle GLTF', error);
      }
    );
    
    }
    
        // Ajouter une lumière directionnelle pour créer des ombres
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(20, 10, 0); // Position de la lumière
    directionalLight.castShadow = true; // Activer les ombres
    scene.add(directionalLight);

    // Configurer les ombres de la lumière directionnelle
    directionalLight.shadow.mapSize.width = 1024; // Largeur de la carte d'ombre
    directionalLight.shadow.mapSize.height = 1024; // Hauteur de la carte d'ombre
    directionalLight.shadow.camera.near = 0.5; // Distance minimale pour le calcul des ombres
    directionalLight.shadow.camera.far = 50; // Distance maximale pour le calcul des ombres


    if (modifyPosition){
      // Ajouter des contrôles OrbitControls à la caméra
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Mouvement fluide
      controls.dampingFactor = 0.25; // Facteur d'amortissement
      controls.enableZoom = true; // Activation du zoom
    }
    


    // Positionner et orienter la caméra
    camera.position.z = 6;
    if (trophieModelData.axeHelper){
      // Ajouter les axes XYZ
      const axesHelper = new THREE.AxesHelper(5); // Définissez la longueur des axes selon vos besoins
        scene.add(axesHelper);
      }
     
      
    
    // Ajouter une lumière ambiante
    console.log(trophieModelData.color)
    const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientLight);
    
    scene.rotation.set(trophieModelData.rotation.axes.x,
      trophieModelData.rotation.axes.y,
      trophieModelData.rotation.axes.z);
    
    
    // Animation de la scène
    const animate = () => {
      requestAnimationFrame(animate);
      if (trophieModelData.isRotate){
        scene.rotateZ(trophieModelData.rotation.speed)
      }
      renderer.render(scene, camera);
      
    };

    animate();

    // Nettoyer la scène lors du démontage du composant
    return () => {
      renderer.dispose();
      if (containerRef.current) {
      containerRef.current.removeChild(renderer.domElement);
    }
    };
  }, [trophieModelData,modifyPosition]);

  return <div ref={containerRef} />;
}

export default TrophieModel;
