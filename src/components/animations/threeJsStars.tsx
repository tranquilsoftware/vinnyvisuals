import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ThreeJsStarsProps {
  className?: string;
  starCount?: number;
  children?: React.ReactNode;
}

const POV_PARAM = 90;

const ThreeJsStars: React.FC<ThreeJsStarsProps> = ({ 
  className = 'fixed inset-0', 
  starCount = 1000,
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const shootingStarsRef = useRef<THREE.Points[]>([]);
  const clockRef = useRef(new THREE.Clock());
  const lastShootingStarTime = useRef(0);
  const shootingStarInterval = useRef(3000 + Math.random() * 7000); // 3-10 seconds

  // Generate random positions for stars
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    return new Float32Array(positions);
  }, [starCount]);

  // Generate random sizes for stars
  const starSizes = useMemo(() => {
    const sizes = [];
    for (let i = 0; i < starCount; i++) {
      sizes.push(0.1 + Math.random() * 0.3); // Random size between 0.1 and 0.4
    }
    return new Float32Array(sizes);
  }, [starCount]);

  // Create a shooting star
  const createShootingStar = (scene: THREE.Scene) => {
    // Create the shooting star points
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2, // Slightly larger size
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
    });

    // Create a line of points for the shooting star
    const points = [];
    const length = 100 + Math.random() * 400; // 100-500px trail length
    for (let i = 0; i < length; i++) {
      points.push(i * 0.5, 0, 0); // More spread out points for longer trail
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    
    const shootingStar = new THREE.Points(geometry, material);
    
    // Random position and direction
    const angle = Math.random() * Math.PI * 2;
    const radius = 1000;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() - 0.5) * 100;
    
    shootingStar.position.set(x, y, z);
    shootingStar.lookAt(0, 0, 0);
    shootingStar.rotateX((Math.random() - 0.5) * 0.5);
    shootingStar.rotateY((Math.random() - 0.5) * 0.5);

    // Create trail with custom shader for smooth fading
    const trailPoints = 10; // Number of points in the trail
    const trailGeometry = new THREE.BufferGeometry();
    
    // Create positions and opacities for the trail
    const positions = new Float32Array(trailPoints * 3);
    const opacities = new Float32Array(trailPoints);
    
    // Initialize all points at the same position
    for (let i = 0; i < trailPoints; i++) {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      // Calculate opacity - decreases along the trail
      opacities[i] = 1 - (i / (trailPoints - 1)) * 0.9; // 10% to 100% opacity
    }
    
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    trailGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    
    const trailMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        opacity: { value: 0.7 }  // Add opacity uniform
      },
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(color, vOpacity * opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    
    // Store previous positions for trail
    const prevPositions: THREE.Vector3[] = [];
    for (let i = 0; i < trailPoints; i++) {
      prevPositions.push(new THREE.Vector3(x, y, z));
    }
    
    shootingStar.userData = {
      velocity: 10 + Math.random() * 10,
      opacity: 1,
      direction: new THREE.Vector3(-x, -y, -z).normalize(),
      birthTime: Date.now(),
      lifeTime: 2000 + Math.random() * 2000, // 2-4 seconds
      trail,
      prevPositions,
      lastUpdate: 0,
      trailUpdateInterval: 50, // Update trail every 50ms
    };
    
    scene.add(shootingStar);
    scene.add(trail);
    shootingStarsRef.current.push(shootingStar);
    
    return shootingStar;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000022);

    const camera = new THREE.PerspectiveCamera(POV_PARAM, window.innerWidth / window.innerHeight, 10, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create stars with varying sizes
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: new THREE.TextureLoader().load("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='white'/></svg>") }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = vec3(1.0, 1.0, 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Camera position
    camera.position.z = 500;
    const clock = clockRef.current;
    clock.start();

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      // const elapsedTime = clock.getElapsedTime();
      
      // Rotate the stars
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0001;
      
      // Create new shooting star at random intervals
      const currentTime = Date.now();
      if (currentTime - lastShootingStarTime.current > shootingStarInterval.current) {
        createShootingStar(scene);
        lastShootingStarTime.current = currentTime;
        shootingStarInterval.current = 3000 + Math.random() * 7000; // 3-10 seconds
      }
      
      // Update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(shootingStar => {
        const data = shootingStar.userData;
        data.opacity -= delta * 0.5; // Fade out over time
        
        // Store current position for trail
        const currentPos = shootingStar.position.clone();
        
        // Move shooting star
        shootingStar.position.x += data.direction.x * data.velocity * delta * 10;
        shootingStar.position.y += data.direction.y * data.velocity * delta * 10;
        shootingStar.position.z += data.direction.z * data.velocity * delta * 10;
        
        // Update trail
        const now = Date.now();
        if (now - data.lastUpdate > data.trailUpdateInterval) {
          // Add current position to trail history
          data.prevPositions.pop(); // Remove oldest position
          data.prevPositions.unshift(currentPos.clone());
          
          // Update trail geometry
          const trailPositions = [];
          for (let i = 0; i < data.prevPositions.length - 1; i++) {
            trailPositions.push(
              data.prevPositions[i].x,
              data.prevPositions[i].y,
              data.prevPositions[i].z,
              data.prevPositions[i + 1].x,
              data.prevPositions[i + 1].y,
              data.prevPositions[i + 1].z
            );
          }
          
          if (data.trail) {
            const trailGeometry = data.trail.geometry as THREE.BufferGeometry;
            trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
            trailGeometry.attributes.position.needsUpdate = true;
          }
          
          data.lastUpdate = now;
        }
        
        // Update material opacity for both star and trail
        const starMaterial = shootingStar.material as THREE.PointsMaterial;
        starMaterial.opacity = data.opacity;
        
        if (data.trail && data.trail.material) {
          const trailMaterial = data.trail.material as THREE.ShaderMaterial;
          trailMaterial.uniforms.opacity.value = data.opacity * 0.7;
        }
        
        // Remove if dead or too far
        const distance = shootingStar.position.length();
        const isDead = data.opacity <= 0 || distance > 2000 || (Date.now() - data.birthTime) > data.lifeTime;
        
        if (isDead) {
          scene.remove(shootingStar);
          if (data.trail) {
            scene.remove(data.trail);
          }
          return false;
        }
        
        return true;
      });
      
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      clock.stop();
    };
  }, [starCount, starPositions, starSizes]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -99
      }}
    >
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default ThreeJsStars;