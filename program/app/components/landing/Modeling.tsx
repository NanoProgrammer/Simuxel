'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function Modeling() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // fondo oscuro

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.2, 100);
    camera.position.set(0, 10, 18);
    camera.lookAt(0, 2, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Luz ambiente blanca suave
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Luz direccional frontal
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Luz de relleno trasera
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let animationFrameId: number;

    loader.load('/models/model.glb', (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;

      // Escala y posición por defecto
      model.scale.set(0.8, 0.8, 0.8);
      model.position.set(0, -4, 0);
      scene.add(model);

      animate();
    });

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
  <div style={{ display: 'flex', width: '100%', height: '120vh',  }} className='bg-[var(--color-dark)] m-0 p-0 overflow-hidden'>
    <div style={{ width: '50%', padding: '2rem', color: '#eee', background: '#111' }}>
      <h2>Modelo 3D</h2>
      <p>Fondo oscuro, luces neutras. Modelo visible con buena iluminación.</p>
    </div>
    <div ref={mountRef} style={{ width: '50%'  }} className='h-full' />
  </div>
);
}
