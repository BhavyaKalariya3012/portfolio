import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// Detailed Ferrari F1 Car Model
const FerrariF1Car = ({ isInteracting }) => {
    const carRef = useRef();
    const wheelsRef = useRef([]);

    const ferrariRed = "#DC0000";
    const ferrariDarkRed = "#8B0000";
    const ferrariBlack = "#0a0a0a";
    const ferrariYellow = "#FFF200";
    const carbonFiber = "#1a1a1a";
    const gold = "#FFD700";

    useFrame((state) => {
        // Only auto-rotate when not interacting
        if (carRef.current && !isInteracting) {
            carRef.current.rotation.y += 0.003;
        }

        // Wheel rotation
        wheelsRef.current.forEach(wheel => {
            if (wheel) wheel.rotation.x += 0.08;
        });

        // Subtle floating
        if (carRef.current && !isInteracting) {
            carRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
        }
    });

    return (
        <group ref={carRef} scale={2.0} position={[0, -0.1, 0]}>
            {/* ===== MAIN CHASSIS ===== */}
            {/* Main monocoque body */}
            <mesh position={[0, 0.18, 0]}>
                <boxGeometry args={[0.38, 0.14, 1.4]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>
            
            {/* Upper body curve */}
            <mesh position={[0, 0.26, 0.15]}>
                <boxGeometry args={[0.32, 0.06, 0.9]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>

            {/* ===== COCKPIT ===== */}
            <mesh position={[0, 0.28, 0.2]}>
                <boxGeometry args={[0.22, 0.12, 0.35]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Halo device */}
            <mesh position={[0, 0.38, 0.15]}>
                <torusGeometry args={[0.12, 0.018, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#444444" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.34, 0.32]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.035, 0.14, 0.035]} />
                <meshStandardMaterial color="#444444" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Driver helmet */}
            <mesh position={[0, 0.33, 0.18]}>
                <sphereGeometry args={[0.065, 16, 16]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Helmet visor */}
            <mesh position={[0, 0.33, 0.22]}>
                <boxGeometry args={[0.08, 0.025, 0.04]} />
                <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* ===== NOSE CONE ===== */}
            <mesh position={[0, 0.14, 0.85]} rotation={[Math.PI / 8, 0, 0]}>
                <coneGeometry args={[0.07, 0.5, 6]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>
            
            {/* Nose tip */}
            <mesh position={[0, 0.08, 1.08]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* ===== FRONT WING ===== */}
            {/* Main front wing plane */}
            <mesh position={[0, 0.04, 1.0]}>
                <boxGeometry args={[0.9, 0.012, 0.22]} />
                <meshStandardMaterial color={carbonFiber} metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Front wing flap 1 */}
            <mesh position={[0, 0.055, 0.95]} rotation={[-0.15, 0, 0]}>
                <boxGeometry args={[0.8, 0.008, 0.08]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Front wing flap 2 */}
            <mesh position={[0, 0.07, 0.92]} rotation={[-0.25, 0, 0]}>
                <boxGeometry args={[0.75, 0.008, 0.06]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Front wing endplates */}
            <mesh position={[0.45, 0.06, 1.0]}>
                <boxGeometry args={[0.012, 0.1, 0.25]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-0.45, 0.06, 1.0]}>
                <boxGeometry args={[0.012, 0.1, 0.25]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* ===== REAR WING ===== */}
            <group position={[0, 0.45, -0.62]}>
                {/* Main element */}
                <mesh>
                    <boxGeometry args={[0.65, 0.14, 0.025]} />
                    <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
                </mesh>
                {/* DRS flap */}
                <mesh position={[0, 0.09, 0.035]} rotation={[0.25, 0, 0]}>
                    <boxGeometry args={[0.62, 0.07, 0.012]} />
                    <meshStandardMaterial color={carbonFiber} metalness={0.9} roughness={0.15} />
                </mesh>
                {/* Endplates */}
                <mesh position={[0.34, -0.02, 0]}>
                    <boxGeometry args={[0.012, 0.22, 0.12]} />
                    <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[-0.34, -0.02, 0]}>
                    <boxGeometry args={[0.012, 0.22, 0.12]} />
                    <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Wing supports (swan neck) */}
                <mesh position={[0.12, -0.2, 0.04]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[0.025, 0.25, 0.045]} />
                    <meshStandardMaterial color={carbonFiber} metalness={0.9} roughness={0.15} />
                </mesh>
                <mesh position={[-0.12, -0.2, 0.04]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[0.025, 0.25, 0.045]} />
                    <meshStandardMaterial color={carbonFiber} metalness={0.9} roughness={0.15} />
                </mesh>
            </group>

            {/* ===== SIDEPODS ===== */}
            {/* Right sidepod */}
            <mesh position={[0.28, 0.17, -0.05]}>
                <boxGeometry args={[0.2, 0.14, 0.7]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>
            {/* Left sidepod */}
            <mesh position={[-0.28, 0.17, -0.05]}>
                <boxGeometry args={[0.2, 0.14, 0.7]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>
            
            {/* Sidepod air intakes */}
            <mesh position={[0.3, 0.22, 0.28]}>
                <boxGeometry args={[0.1, 0.08, 0.18]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.3, 0.22, 0.28]}>
                <boxGeometry args={[0.1, 0.08, 0.18]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ===== ENGINE COVER ===== */}
            <mesh position={[0, 0.26, -0.35]}>
                <boxGeometry args={[0.24, 0.12, 0.5]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.95} roughness={0.08} />
            </mesh>
            
            {/* Air intake above driver */}
            <mesh position={[0, 0.38, -0.02]}>
                <boxGeometry args={[0.12, 0.1, 0.22]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* ===== FLOOR & DIFFUSER ===== */}
            <mesh position={[0, 0.02, 0]}>
                <boxGeometry args={[0.55, 0.02, 1.6]} />
                <meshStandardMaterial color={carbonFiber} metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Diffuser */}
            <mesh position={[0, 0.06, -0.72]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[0.5, 0.02, 0.2]} />
                <meshStandardMaterial color={carbonFiber} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ===== WHEELS ===== */}
            {/* Front Left */}
            <group position={[0.38, 0.11, 0.58]}>
                <mesh ref={el => wheelsRef.current[0] = el} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.09, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.6} roughness={0.5} />
                </mesh>
                {/* Wheel rim */}
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.065, 0.065, 0.095, 5]} />
                    <meshStandardMaterial color={gold} metalness={0.95} roughness={0.1} />
                </mesh>
                {/* Wheel cover */}
                <mesh position={[0.048, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.01, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
                </mesh>
            </group>
            
            {/* Front Right */}
            <group position={[-0.38, 0.11, 0.58]}>
                <mesh ref={el => wheelsRef.current[1] = el} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.09, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.6} roughness={0.5} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.065, 0.065, 0.095, 5]} />
                    <meshStandardMaterial color={gold} metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[-0.048, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.01, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
                </mesh>
            </group>
            
            {/* Rear Left */}
            <group position={[0.4, 0.14, -0.48]}>
                <mesh ref={el => wheelsRef.current[2] = el} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.14, 0.14, 0.12, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.6} roughness={0.5} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.085, 0.085, 0.125, 5]} />
                    <meshStandardMaterial color={gold} metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[0.062, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.01, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
                </mesh>
            </group>
            
            {/* Rear Right */}
            <group position={[-0.4, 0.14, -0.48]}>
                <mesh ref={el => wheelsRef.current[3] = el} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.14, 0.14, 0.12, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.6} roughness={0.5} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.085, 0.085, 0.125, 5]} />
                    <meshStandardMaterial color={gold} metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[-0.062, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.11, 0.11, 0.01, 32]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            {/* ===== SUSPENSION ===== */}
            {/* Front suspension */}
            <mesh position={[0.22, 0.1, 0.55]} rotation={[0, 0, 0.4]}>
                <boxGeometry args={[0.22, 0.012, 0.012]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>
            <mesh position={[-0.22, 0.1, 0.55]} rotation={[0, 0, -0.4]}>
                <boxGeometry args={[0.22, 0.012, 0.012]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>
            {/* Rear suspension */}
            <mesh position={[0.24, 0.12, -0.45]} rotation={[0, 0, 0.35]}>
                <boxGeometry args={[0.22, 0.012, 0.012]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>
            <mesh position={[-0.24, 0.12, -0.45]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[0.22, 0.012, 0.012]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>

            {/* ===== DETAILS & SPONSORS ===== */}
            {/* Ferrari logo area (yellow shield) */}
            <mesh position={[0, 0.27, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.1, 0.07]} />
                <meshBasicMaterial color={ferrariYellow} />
            </mesh>
            
            {/* Number plates on sidepods */}
            <mesh position={[0.39, 0.2, -0.05]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[0.2, 0.12]} />
                <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-0.39, 0.2, -0.05]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[0.2, 0.12]} />
                <meshBasicMaterial color="#FFFFFF" />
            </mesh>

            {/* Mirrors */}
            <mesh position={[0.24, 0.3, 0.38]} rotation={[0, 0.3, 0]}>
                <boxGeometry args={[0.025, 0.035, 0.06]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>
            <mesh position={[-0.24, 0.3, 0.38]} rotation={[0, -0.3, 0]}>
                <boxGeometry args={[0.025, 0.035, 0.06]} />
                <meshStandardMaterial color={carbonFiber} />
            </mesh>

            {/* T-cam on top */}
            <mesh position={[0, 0.42, 0.02]}>
                <boxGeometry args={[0.03, 0.04, 0.06]} />
                <meshStandardMaterial color={ferrariYellow} />
            </mesh>

            {/* Exhaust pipes */}
            <mesh position={[0.06, 0.18, -0.72]}>
                <cylinderGeometry args={[0.02, 0.025, 0.08, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[-0.06, 0.18, -0.72]}>
                <cylinderGeometry args={[0.02, 0.025, 0.08, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Exhaust glow */}
            <pointLight position={[0, 0.18, -0.78]} color="#FF4400" intensity={5} distance={1.5} />
            <pointLight position={[0.06, 0.18, -0.78]} color="#FF6600" intensity={2} distance={0.8} />
            <pointLight position={[-0.06, 0.18, -0.78]} color="#FF6600" intensity={2} distance={0.8} />
        </group>
    );
};

const Landing = () => {
    const sectionRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Transforms based on scroll
    const carScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
    const speedLinesOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0]);

    return (
        <section 
            ref={sectionRef} 
            className="relative h-[200vh]"
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-carbon">
                {/* 3D Canvas with Ferrari */}
                <motion.div 
                    className="absolute inset-0 z-10"
                    style={{ 
                        opacity,
                        scale: carScale,
                    }}
                >
                    <Canvas
                        camera={{ position: [3, 2, 5], fov: 45 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <Suspense fallback={null}>
                            {/* Lighting */}
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                            <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#DC0000" />
                            <pointLight position={[0, 5, 0]} intensity={0.8} color="#FFF200" />
                            <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                            
                            {/* Ferrari Car */}
                            <FerrariF1Car isInteracting={isInteracting} />
                            
                            {/* Ground shadow */}
                            <ContactShadows 
                                position={[0, -0.35, 0]} 
                                opacity={0.6} 
                                scale={8} 
                                blur={2} 
                                far={4} 
                            />
                            
                            {/* Controls - Allow user to rotate */}
                            <OrbitControls 
                                enableZoom={false}
                                enablePan={false}
                                minPolarAngle={Math.PI / 4}
                                maxPolarAngle={Math.PI / 2.2}
                                onStart={() => setIsInteracting(true)}
                                onEnd={() => setIsInteracting(false)}
                            />
                        </Suspense>
                    </Canvas>
                </motion.div>

                {/* Drag to rotate hint */}
                <motion.div 
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-30"
                    style={{ opacity }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full carbon-glass text-gray-400 text-sm">
                        <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <span className="font-racing tracking-wider">DRAG TO ROTATE</span>
                    </div>
                </motion.div>

                {/* Speed Lines Effect */}
                <motion.div 
                    className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                    style={{ opacity: speedLinesOpacity }}
                >
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                            style={{
                                top: `${5 + (i * 3)}%`,
                                left: '-100%',
                                width: `${50 + Math.random() * 100}%`,
                                opacity: 0.3 + Math.random() * 0.4,
                            }}
                            animate={{
                                left: ['100%', '-100%'],
                            }}
                            transition={{
                                duration: 0.3 + Math.random() * 0.3,
                                repeat: Infinity,
                                delay: Math.random() * 0.5,
                                ease: "linear"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Red speed lines */}
                <motion.div 
                    className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                    style={{ opacity: speedLinesOpacity }}
                >
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`red-${i}`}
                            className="absolute h-[3px] bg-gradient-to-r from-transparent via-f1-red to-transparent"
                            style={{
                                top: `${10 + (i * 6)}%`,
                                left: '-100%',
                                width: `${30 + Math.random() * 70}%`,
                                opacity: 0.5 + Math.random() * 0.5,
                            }}
                            animate={{
                                left: ['100%', '-100%'],
                            }}
                            transition={{
                                duration: 0.2 + Math.random() * 0.2,
                                repeat: Infinity,
                                delay: Math.random() * 0.3,
                                ease: "linear"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Vignette overlay */}
                <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

                {/* Title */}
                <motion.div 
                    className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-32 pointer-events-none"
                    style={{ opacity }}
                >
                    <motion.h1 
                        className="font-racing text-5xl md:text-7xl lg:text-8xl font-black text-white text-center mb-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <span className="text-f1-red">BHAVYA</span>
                    </motion.h1>
                    <motion.p 
                        className="font-racing text-lg md:text-xl text-gray-400 tracking-[0.5em] uppercase"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Web Developer
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
                    style={{ opacity }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <span className="font-racing text-xs tracking-widest uppercase">Scroll to Start</span>
                        <div className="w-6 h-10 rounded-full border-2 border-f1-red/50 flex items-start justify-center p-1">
                            <motion.div
                                className="w-1.5 h-3 bg-f1-red rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Corner accents */}
                <div className="absolute top-8 left-8 w-24 h-24 border-l-4 border-t-4 border-f1-red/50 pointer-events-none" />
                <div className="absolute top-8 right-8 w-24 h-24 border-r-4 border-t-4 border-f1-red/50 pointer-events-none" />
                <div className="absolute bottom-8 left-8 w-24 h-24 border-l-4 border-b-4 border-f1-red/30 pointer-events-none" />
                <div className="absolute bottom-8 right-8 w-24 h-24 border-r-4 border-b-4 border-f1-red/30 pointer-events-none" />
            </div>
        </section>
    );
};

export default Landing;
