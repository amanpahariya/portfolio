"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playTactileClick } from "@/utility/sound";

export default function HeroSculpture() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeMode, setActiveMode] = useState("sync"); // "sync" | "expand" | "matrix"
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Use refs to communicate mode shifts to the render loop without re-instantiating scene
  const modeRef = useRef("sync");
  modeRef.current = activeMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL support verification
    let renderer;
    try {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) throw new Error("WebGL not available");

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch {
      setWebglFailed(true);
      return;
    }

    // Palette
    const COLOR_CHARCOAL = 0x22201d;
    const COLOR_MUTED_GREEN = 0x5b7b6b;
    const COLOR_CHARTREUSE = 0xc8e63a;
    const COLOR_IVORY = 0xf7f4ee;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 7, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(COLOR_CHARTREUSE, 1.8);
    rimLight.position.set(-6, -4, 3);
    scene.add(rimLight);

    const cursorPointLight = new THREE.PointLight(COLOR_CHARTREUSE, 2, 8);
    cursorPointLight.position.set(0, 0, 4);
    scene.add(cursorPointLight);

    // Root Assembly Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Core Polyhedron (Dual Structure)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: COLOR_CHARCOAL,
      roughness: 0.25,
      metalness: 0.2,
      clearcoat: 0.5,
      flatShading: true,
    });
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: COLOR_CHARTREUSE,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), coreMat);
    const coreWireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.24, 0), coreWireMat);
    const coreGroup = new THREE.Group();
    coreGroup.add(coreMesh);
    coreGroup.add(coreWireMesh);
    rootGroup.add(coreGroup);

    // 2. Gimbal Outer Ring 1 (Muted Green Torus)
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: COLOR_MUTED_GREEN,
      roughness: 0.35,
      metalness: 0.4,
      flatShading: true,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.055, 16, 80), ring1Mat);
    const ring1Group = new THREE.Group();
    ring1Group.add(ring1);
    rootGroup.add(ring1Group);

    // 3. Orbital Ring 2 (Chartreuse Slender Gyro)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: COLOR_CHARTREUSE,
      roughness: 0.2,
      metalness: 0.6,
      wireframe: false,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.035, 16, 64), ring2Mat);
    const ring2Group = new THREE.Group();
    ring2Group.add(ring2);
    ring2Group.rotation.x = Math.PI / 3;
    rootGroup.add(ring2Group);

    // 4. Kinetic Satellite Nodes
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satellites = [];
    const satCount = 6;
    const satGeo = new THREE.OctahedronGeometry(0.18, 0);

    for (let i = 0; i < satCount; i++) {
      const isAccent = i % 2 === 0;
      const mat = new THREE.MeshStandardMaterial({
        color: isAccent ? COLOR_CHARTREUSE : COLOR_MUTED_GREEN,
        roughness: 0.3,
        metalness: 0.3,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(satGeo, mat);
      satelliteGroup.add(mesh);
      satellites.push({
        mesh,
        angle: (i / satCount) * Math.PI * 2,
        speed: 0.4 + (i % 3) * 0.25,
        radius: 2.7 + (i % 2) * 0.4,
        yPhase: i * 1.2,
      });
    }

    // 5. Constellation Matrix Nodes & Dynamic Connection Lines
    const matrixNodeCount = 28;
    const matrixPositions = new Float32Array(matrixNodeCount * 3);
    const matrixVelocities = [];

    for (let i = 0; i < matrixNodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.6 + Math.random() * 1.8;
      const sinPhi = Math.sin(phi);

      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      matrixPositions[i * 3] = x;
      matrixPositions[i * 3 + 1] = y;
      matrixPositions[i * 3 + 2] = z;

      matrixVelocities.push({
        thetaSpeed: (Math.random() - 0.5) * 0.008,
        phiSpeed: (Math.random() - 0.5) * 0.006,
        r,
        theta,
        phi,
      });
    }

    // Matrix Points Mesh
    const matrixPointsGeo = new THREE.BufferGeometry();
    matrixPointsGeo.setAttribute("position", new THREE.BufferAttribute(matrixPositions, 3));
    const matrixPointsMat = new THREE.PointsMaterial({
      color: COLOR_MUTED_GREEN,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const matrixPoints = new THREE.Points(matrixPointsGeo, matrixPointsMat);
    rootGroup.add(matrixPoints);

    // Matrix Lines (Dynamic LineSegments)
    const maxLines = 80;
    const linePositions = new Float32Array(maxLines * 6);
    const matrixLinesGeo = new THREE.BufferGeometry();
    matrixLinesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const matrixLinesMat = new THREE.LineBasicMaterial({
      color: COLOR_CHARTREUSE,
      transparent: true,
      opacity: 0.35,
    });
    const matrixLines = new THREE.LineSegments(matrixLinesGeo, matrixLinesMat);
    rootGroup.add(matrixLines);

    // Pointer Interaction & Drag Physics
    let targetRotX = 0.2;
    let targetRotY = -0.3;
    let curRotX = 0.2;
    let curRotY = -0.3;
    let velRotX = 0;
    let velRotY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let prefersReduced = false;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReduced = mq.matches;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      playTactileClick("tick");
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Move 3D point light
      cursorPointLight.position.x = nx * 3.5;
      cursorPointLight.position.y = ny * 3.5;

      if (isDragging) {
        const dx = e.clientX - prevPointerX;
        const dy = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        velRotY = dx * 0.007;
        velRotX = dy * 0.007;
        targetRotY += velRotY;
        targetRotX += velRotX;
      } else if (!prefersReduced) {
        targetRotY = -0.3 + nx * 0.5;
        targetRotX = 0.2 - ny * 0.4;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    onResize();

    // Render Loop & Performance Throttling
    let rafId = null;
    let isPaused = false;
    let lastTime = 0;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isPaused = !entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation Tick
    const animate = (timestamp) => {
      rafId = requestAnimationFrame(animate);
      if (isPaused) return;

      const delta = (timestamp - lastTime) * 0.001;
      lastTime = timestamp;
      const t = timestamp * 0.001;

      // Inertia drag damping
      if (isDragging) {
        curRotX += (targetRotX - curRotX) * 0.2;
        curRotY += (targetRotY - curRotY) * 0.2;
      } else {
        if (!prefersReduced) {
          velRotX *= 0.92;
          velRotY *= 0.92;
          targetRotY += 0.004 + velRotY;
          targetRotX += velRotX;
        }
        curRotX += (targetRotX - curRotX) * 0.06;
        curRotY += (targetRotY - curRotY) * 0.06;
      }

      rootGroup.rotation.x = curRotX;
      rootGroup.rotation.y = curRotY;

      const mode = modeRef.current;

      // System Mode Behaviours
      let expandFactor = 1.0;
      let matrixIntensity = 0.4;

      if (mode === "expand") {
        expandFactor = 1.45;
        matrixIntensity = 0.6;
      } else if (mode === "matrix") {
        expandFactor = 1.1;
        matrixIntensity = 1.0;
      }

      // 1. Core Rotation & Scaling
      coreGroup.rotation.y = t * 0.3;
      coreGroup.rotation.x = Math.sin(t * 0.4) * 0.2;
      const targetCoreScale = mode === "expand" ? 0.85 : 1.0;
      coreGroup.scale.lerp(new THREE.Vector3(targetCoreScale, targetCoreScale, targetCoreScale), 0.08);

      // 2. Gyro Rings
      ring1Group.rotation.z = t * 0.4;
      ring1Group.rotation.y = Math.cos(t * 0.3) * 0.4;
      ring1.scale.lerp(new THREE.Vector3(expandFactor, expandFactor, expandFactor), 0.08);

      ring2Group.rotation.y = -t * 0.55;
      ring2Group.rotation.z = Math.sin(t * 0.35) * 0.5;
      const ring2Scale = expandFactor * 1.1;
      ring2.scale.lerp(new THREE.Vector3(ring2Scale, ring2Scale, ring2Scale), 0.08);

      // 3. Satellites
      satellites.forEach((sat) => {
        const angle = sat.angle + t * sat.speed;
        const currentRadius = sat.radius * expandFactor;
        const sx = Math.cos(angle) * currentRadius;
        const sz = Math.sin(angle) * currentRadius;
        const sy = Math.sin(t * 1.4 + sat.yPhase) * 0.6;

        sat.mesh.position.set(sx, sy, sz);
        sat.mesh.rotation.x = t * sat.speed * 2;
        sat.mesh.rotation.y = t * sat.speed * 1.5;
      });

      // 4. Matrix Points & Dynamic Line Connections
      const posAttr = matrixPointsGeo.attributes.position;
      let lineIndex = 0;

      for (let i = 0; i < matrixNodeCount; i++) {
        const vel = matrixVelocities[i];
        vel.theta += vel.thetaSpeed;
        vel.phi += vel.phiSpeed;

        const effectiveR = vel.r * (mode === "matrix" ? 1.3 : expandFactor);
        const sinPhi = Math.sin(vel.phi);
        const px = effectiveR * sinPhi * Math.cos(vel.theta);
        const py = effectiveR * sinPhi * Math.sin(vel.theta);
        const pz = effectiveR * Math.cos(vel.phi);

        posAttr.setXYZ(i, px, py, pz);

        // Connect nearby nodes with lines
        if (lineIndex < maxLines * 2) {
          for (let j = i + 1; j < matrixNodeCount; j++) {
            const x2 = posAttr.getX(j);
            const y2 = posAttr.getY(j);
            const z2 = posAttr.getZ(j);

            const distSq = (px - x2) ** 2 + (py - y2) ** 2 + (pz - z2) ** 2;
            const threshold = mode === "matrix" ? 2.8 : 1.4;

            if (distSq < threshold && lineIndex < maxLines * 2) {
              linePositions[lineIndex * 3] = px;
              linePositions[lineIndex * 3 + 1] = py;
              linePositions[lineIndex * 3 + 2] = pz;
              linePositions[(lineIndex + 1) * 3] = x2;
              linePositions[(lineIndex + 1) * 3 + 1] = y2;
              linePositions[(lineIndex + 1) * 3 + 2] = z2;
              lineIndex += 2;
            }
          }
        }
      }
      posAttr.needsUpdate = true;
      matrixLinesGeo.setDrawRange(0, lineIndex);
      matrixLinesGeo.attributes.position.needsUpdate = true;
      matrixLinesMat.opacity = matrixIntensity * 0.45;
      matrixPointsMat.opacity = matrixIntensity * 0.9;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    playTactileClick("snap");
  };

  if (webglFailed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-paper rounded border border-border-subtle text-charcoal">
        <div className="w-24 h-24 mb-4 rounded-full border-2 border-dashed border-chartreuse flex items-center justify-center animate-spin-slow">
          <span className="font-mono text-xs uppercase text-muted-green font-bold">[CORE]</span>
        </div>
        <p className="font-mono text-xs text-charcoal-light uppercase tracking-widest text-center">
          WebGL Architecture Fallback Active
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] lg:min-h-[460px] flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        aria-label="Interactive 3D Kinetic Sculpture representing connected systems"
      />

      {/* Kinetic Telemetry Crosshairs Overlay */}
      <div
        className="absolute top-2 left-2 flex items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse" />
        <span className="font-mono text-[10px] text-charcoal-light tracking-widest uppercase">
          KINETIC_CORE · {isInteracting ? "ENGAGED" : "RESONATING"}
        </span>
      </div>

      <div
        className="absolute top-2 right-2 font-mono text-[9px] text-charcoal-light/70 tracking-widest uppercase pointer-events-none"
        aria-hidden="true"
      >
        DRAG TO ROTATE
      </div>

      {/* Interactive System Mode Selector Pills */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-ivory/90 backdrop-blur-md border border-border-subtle rounded-full shadow-sm z-20"
        role="group"
        aria-label="3D Sculpture System Modes"
      >
        {[
          { id: "sync", label: "01 // SYNC" },
          { id: "expand", label: "02 // EXPAND" },
          { id: "matrix", label: "03 // MATRIX" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleModeChange(item.id)}
            className={`px-3 py-1 text-[10px] font-mono font-medium rounded-full transition-all duration-200 ${
              activeMode === item.id
                ? "bg-charcoal text-chartreuse shadow-sm"
                : "text-charcoal-mid hover:text-charcoal hover:bg-paper"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
