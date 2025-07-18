'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Ethane3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Dark background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Ethane molecule geometry
    // Carbon atoms (gray)
    const carbonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const carbonMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const carbon1 = new THREE.Mesh(carbonGeometry, carbonMaterial);
    carbon1.position.set(0, 0, 0);
    scene.add(carbon1);
    const carbon2 = new THREE.Mesh(carbonGeometry, carbonMaterial);
    carbon2.position.set(1.54, 0, 0); // C-C bond length ~1.54 Å
    scene.add(carbon2);

    // Hydrogen atoms (white)
    const hydrogenGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const hydrogenMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    // Positions for hydrogens around carbon1 (tetrahedral)
    const h1Positions = [
      [-0.36, 0.36, 0.36], // H1
      [-0.36, -0.36, 0.36], // H2
      [-0.36, 0, -0.36], // H3
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));

    // Positions for hydrogens around carbon2 (tetrahedral)
    const h2Positions = [
      [1.54 + 0.36, 0.36, 0.36], // H4
      [1.54 + 0.36, -0.36, 0.36], // H5
      [1.54 + 0.36, 0, -0.36], // H6
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));

    // Add hydrogen atoms
    const hydrogens = [...h1Positions, ...h2Positions].map((pos) => {
      const hydrogen = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
      hydrogen.position.copy(pos);
      scene.add(hydrogen);
      return hydrogen;
    });

    // C-C bond (cylinder)
    const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    const ccBond = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.54, 32),
      bondMaterial
    );
    ccBond.position.set(0.77, 0, 0); // Midpoint between carbons
    ccBond.rotation.z = Math.PI / 2; // Align along x-axis
    scene.add(ccBond);

    // C-H bonds
    const chBondGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.09, 32); // C-H bond length ~1.09 Å
    const chBonds = [...h1Positions, ...h2Positions].map((hPos, i) => {
      const start = i < 3 ? carbon1.position : carbon2.position;
      const bond = new THREE.Mesh(chBondGeometry, bondMaterial);
      const direction = new THREE.Vector3().subVectors(hPos, start);
      const length = direction.length();
      bond.position.copy(start).add(direction.multiplyScalar(0.5));
      bond.scale.z = length;
      bond.lookAt(hPos);
      scene.add(bond);
      return bond;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate molecule for visual effect
      scene.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div ref={mountRef} />
    </div>
  );
}