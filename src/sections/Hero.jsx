import { useEffect, useRef, Suspense, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import F1HeroScene from '../components/F1HeroScene';
import { personalInfo } from '../constants/data';
import { ScrollContext } from '../App';

const Hero = () => {
    const sectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { velocity } = useContext(ScrollContext);

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.8 });

            // Race lights countdown feel
            tl.from('.hero-driver-number', {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            })
                .from('.hero-tagline', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.3')
                .from('.hero-name', {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.5')
                .from('.hero-role', {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6')
                .from('.hero-description', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .from('.hero-cta', {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.1
                }, '-=0.3')
                .from('.hero-scroll', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.2');
        }, section);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        setMousePosition({
            x: (clientX / innerWidth - 0.5) * 2,
            y: (clientY / innerHeight - 0.5) * 2
        });
    };

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 1, 6], fov: 50 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <F1HeroScene mousePosition={mousePosition} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Speed lines effect based on scroll */}
            <div
                className={`speed-lines-container ${velocity > 2 ? 'active' : ''}`}
                style={{ opacity: Math.min(velocity / 10, 0.5) }}
            >
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="speed-line"
                        style={{
                            top: `${10 + i * 8}%`,
                            animationDelay: `${i * 0.05}s`,
                            width: `${30 + Math.random() * 40}%`
                        }}
                    />
                ))}
            </div>

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-transparent to-carbon z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon/50 via-transparent to-carbon/50 z-[1]" />

            {/* Content */}
            <div className="relative z-10 section-container text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Driver Number Badge */}
                    <div className="hero-driver-number inline-flex items-center gap-3 mb-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-f1-red to-racing-blue flex items-center justify-center shadow-glow-red">
                            <span className="font-racing text-3xl md:text-4xl font-black text-white">
                                {personalInfo.raceNumber}
                            </span>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="hero-tagline font-racing text-sm md:text-base text-racing-blue tracking-[0.4em] uppercase mb-4">
                        {personalInfo.tagline}
                    </p>

                    {/* Name */}
                    <h1 className="hero-name font-racing text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
                        <span className="gradient-racing">{personalInfo.name}</span>
                    </h1>

                    {/* Role */}
                    <h2 className="hero-role text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6">
                        {personalInfo.role}
                    </h2>

                    {/* Description */}
                    <p className="hero-description text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Building blazing-fast, pixel-perfect digital experiences.
                        Like an F1 engineer, I obsess over every millisecond.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="hero-cta btn-racing px-8 py-4 rounded-lg text-white font-semibold text-lg flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Enter Garage</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="hero-cta carbon-glass px-8 py-4 rounded-lg text-white font-semibold text-lg border border-racing-blue/30 hover:border-racing-blue transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Driver
                        </motion.a>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
                    onClick={scrollToAbout}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <span className="font-racing text-xs tracking-widest uppercase">Start Race</span>
                        <div className="w-6 h-10 rounded-full border-2 border-racing-blue/50 flex items-start justify-center p-1">
                            <motion.div
                                className="w-1.5 h-3 bg-racing-blue rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Corner racing elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-f1-red/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-racing-blue/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-racing-blue/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-f1-red/30 pointer-events-none" />
        </section>
    );
};

export default Hero;
