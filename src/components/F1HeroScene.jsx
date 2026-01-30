import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Simplified F1 Car geometry using primitives - Ferrari Style
const F1Car = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
    const carRef = useRef();
    const wheelsRef = useRef([]);

    // Ferrari colors
    const ferrariRed = "#DC0000";
    const ferrariDarkRed = "#A80000";
    const ferrariBlack = "#1a1a1a";
    const ferrariYellow = "#FFF200";

    useFrame((state) => {
        // Wheel rotation
        wheelsRef.current.forEach(wheel => {
            if (wheel) wheel.rotation.x += 0.3;
        });

        // Subtle hovering
        if (carRef.current) {
            carRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        }
    });

    return (
        <group ref={carRef} position={position} rotation={rotation} scale={scale}>
            {/* Main body - Ferrari Red */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.4, 0.12, 1.2]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Cockpit */}
            <mesh position={[0, 0.22, 0.1]}>
                <boxGeometry args={[0.25, 0.1, 0.3]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Nose cone - Ferrari Red */}
            <mesh position={[0, 0.12, 0.7]} rotation={[Math.PI / 6, 0, 0]}>
                <coneGeometry args={[0.08, 0.4, 4]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Front wing - Black with red edge */}
            <mesh position={[0, 0.05, 0.85]}>
                <boxGeometry args={[0.7, 0.02, 0.15]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Rear wing - Black */}
            <group position={[0, 0.35, -0.5]}>
                <mesh>
                    <boxGeometry args={[0.55, 0.15, 0.02]} />
                    <meshStandardMaterial color={ferrariBlack} metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Wing supports */}
                <mesh position={[0.2, -0.1, 0]}>
                    <boxGeometry args={[0.02, 0.2, 0.05]} />
                    <meshStandardMaterial color={ferrariRed} />
                </mesh>
                <mesh position={[-0.2, -0.1, 0]}>
                    <boxGeometry args={[0.02, 0.2, 0.05]} />
                    <meshStandardMaterial color={ferrariRed} />
                </mesh>
            </group>

            {/* Side pods - Ferrari Red */}
            <mesh position={[0.22, 0.12, -0.1]}>
                <boxGeometry args={[0.12, 0.1, 0.5]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-0.22, 0.12, -0.1]}>
                <boxGeometry args={[0.12, 0.1, 0.5]} />
                <meshStandardMaterial color={ferrariRed} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Wheels */}
            {/* Front left */}
            <mesh ref={el => wheelsRef.current[0] = el} position={[0.28, 0.08, 0.45]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.5} roughness={0.7} />
            </mesh>
            {/* Front right */}
            <mesh ref={el => wheelsRef.current[1] = el} position={[-0.28, 0.08, 0.45]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.5} roughness={0.7} />
            </mesh>
            {/* Rear left */}
            <mesh ref={el => wheelsRef.current[2] = el} position={[0.3, 0.1, -0.35]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.5} roughness={0.7} />
            </mesh>
            {/* Rear right */}
            <mesh ref={el => wheelsRef.current[3] = el} position={[-0.3, 0.1, -0.35]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
                <meshStandardMaterial color={ferrariBlack} metalness={0.5} roughness={0.7} />
            </mesh>

            {/* Ferrari Shield/Logo area - Yellow accent */}
            <mesh position={[0, 0.22, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.15, 0.1]} />
                <meshBasicMaterial color={ferrariYellow} />
            </mesh>

            {/* Exhaust glow */}
            <pointLight position={[0, 0.12, -0.6]} color="#FF4400" intensity={2} distance={0.5} />
        </group>
    );
};

// Racing track component
const RacingTrack = () => {
    const trackRef = useRef();

    useFrame((state) => {
        if (trackRef.current) {
            // Animate track moving toward camera (gives illusion of car moving)
            trackRef.current.position.z = (state.clock.elapsedTime * 2) % 10 - 5;
        }
    });

    // Track segments
    const segments = useMemo(() => {
        const segs = [];
        for (let i = 0; i < 20; i++) {
            segs.push(i * 2 - 20);
        }
        return segs;
    }, []);

    return (
        <group ref={trackRef}>
            {/* Main track surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[3, 50]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Track markings - center line */}
            {segments.map((z, i) => (
                <mesh key={`center-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
                    <planeGeometry args={[0.05, 0.8]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>
            ))}

            {/* Left kerb */}
            {segments.map((z, i) => (
                <mesh key={`kerb-l-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-1.4, 0, z]}>
                    <planeGeometry args={[0.15, 0.8]} />
                    <meshBasicMaterial color={i % 2 === 0 ? "#FF1801" : "#FFFFFF"} />
                </mesh>
            ))}

            {/* Right kerb */}
            {segments.map((z, i) => (
                <mesh key={`kerb-r-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[1.4, 0, z]}>
                    <planeGeometry args={[0.15, 0.8]} />
                    <meshBasicMaterial color={i % 2 === 0 ? "#FF1801" : "#FFFFFF"} />
                </mesh>
            ))}
        </group>
    );
};

// Speed particles
const SpeedParticles = ({ count = 100 }) => {
    const particlesRef = useRef();

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 1] = Math.random() * 3;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
            vel[i] = Math.random() * 0.3 + 0.1;
        }

        return [pos, vel];
    }, [count]);

    useFrame(() => {
        if (!particlesRef.current) return;
        const positions = particlesRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 2] += velocities[i];

            if (positions[i * 3 + 2] > 10) {
                positions[i * 3 + 2] = -10;
                positions[i * 3] = (Math.random() - 0.5) * 6;
                positions[i * 3 + 1] = Math.random() * 3;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#FF1801"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Main Hero Scene
const F1HeroScene = ({ mousePosition }) => {
    const groupRef = useRef();
    const { viewport } = useThree();

    // Mouse-based camera movement
    useFrame(() => {
        if (groupRef.current && mousePosition) {
            const targetX = mousePosition.x * 0.3;
            const targetY = mousePosition.y * 0.2;

            groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
            groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.02;
        }
    });

    const isMobile = viewport.width < 5;
    const carScale = isMobile ? 1.5 : 2;

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#FFFFFF" />
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00D2FF" />
            <pointLight position={[5, 3, 5]} intensity={0.5} color="#FF1801" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0D0D0D', 5, 25]} />

            <group ref={groupRef}>
                {/* F1 Car */}
                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                    <F1Car position={[0, 0.5, 2]} scale={carScale} />
                </Float>

                {/* Racing Track */}
                <RacingTrack />

                {/* Speed Particles */}
                <SpeedParticles count={150} />
            </group>

            {/* Track lights in distance */}
            {[-8, -4, 0, 4, 8].map((z, i) => (
                <pointLight
                    key={i}
                    position={[i % 2 === 0 ? 2 : -2, 2, z]}
                    color={i % 2 === 0 ? "#FF1801" : "#00D2FF"}
                    intensity={0.3}
                    distance={5}
                />
            ))}
        </>
    );
};

export default F1HeroScene;
