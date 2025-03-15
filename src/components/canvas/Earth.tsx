import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { usePerformance } from "../../context/PerformanceContext";
import { motion } from "framer-motion";

const Earth = () => {
  const { disable3D } = usePerformance();
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const handleError = () => {
      console.error("WebGL context lost");
      disable3D();
    };
    
    window.addEventListener('webglcontextlost', handleError);
    return () => window.removeEventListener('webglcontextlost', handleError);
  }, [disable3D]);
  
  try {
    const earth = useGLTF("./planet/scene.gltf", true, true);
    
    if (error) {
      disable3D();
      return null;
    }

    return (
      <primitive 
        object={earth.scene} 
        scale={2.5} 
        position-y={0} 
        rotation-y={0}
        dispose={null}
      />
    );
  } catch (err) {
    if (!error) {
      console.error("Error loading Earth model:", err);
      setError(true);
      disable3D();
    }
    return null;
  }
};

const Fallback = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-800 animate-pulse shadow-lg shadow-blue-500/50">
          <div className="absolute inset-0 rounded-full border-4 border-white/20 border-dashed animate-spin-slow"></div>
        </div>
        <p className="text-white">Interactive 3D Globe</p>
      </div>
    </div>
  );
};

const EarthCanvas = () => {
  const { is3DEnabled } = usePerformance();

  if (!is3DEnabled) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full bg-tertiary rounded-lg flex items-center justify-center"
      >
        <Fallback />
      </motion.div>
    );
  }

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        shadows={false}
        frameloop="demand"
        dpr={0.7}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: 'low-power',
          antialias: false,
          depth: true,
          stencil: false,
          alpha: false,
          precision: "lowp"
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        performance={{ min: 0.1, max: 1 }}
        style={{ maxWidth: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#1d1836', 1);
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            rotateSpeed={0.3}
          />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} intensity={0.5} />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload("./planet/scene.gltf");
export default EarthCanvas;
