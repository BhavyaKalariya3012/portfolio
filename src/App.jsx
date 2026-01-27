import { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Components
import F1Loader from './components/F1Loader';
import RacingHUD from './components/RacingHUD';
import Navbar from './components/Navbar';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

// Create context for scroll velocity
export const ScrollContext = createContext({ velocity: 0, progress: 0 });

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    // Initialize smooth scroll with Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2
        });

        // Track scroll velocity for speed effects
        lenis.on('scroll', ({ velocity, progress }) => {
            setScrollVelocity(Math.abs(velocity));
            setScrollProgress(progress);

            // Determine current section based on progress
            const sectionIndex = Math.floor(progress * 6);
            setCurrentSection(Math.min(sectionIndex, 5));
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    // Simulate F1 race start loading sequence
    useEffect(() => {
        const stages = [
            { target: 20, delay: 150, text: "Initializing systems..." },
            { target: 40, delay: 100, text: "Loading telemetry..." },
            { target: 60, delay: 80, text: "Warming up engines..." },
            { target: 80, delay: 60, text: "Final checks..." },
            { target: 100, delay: 40, text: "GO GO GO!" }
        ];

        let currentStage = 0;

        const interval = setInterval(() => {
            setLoadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 600);
                    return 100;
                }

                const stage = stages[currentStage];
                if (prev >= stage.target && currentStage < stages.length - 1) {
                    currentStage++;
                }

                return Math.min(prev + Math.random() * 8 + 2, 100);
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollContext.Provider value={{ velocity: scrollVelocity, progress: scrollProgress }}>
            <div className="relative bg-carbon min-h-screen overflow-hidden">
                {/* F1 Loading Screen */}
                <AnimatePresence mode="wait">
                    {isLoading && <F1Loader progress={Math.min(loadProgress, 100)} />}
                </AnimatePresence>

                {!isLoading && (
                    <>
                        {/* Racing HUD Overlay */}
                        <RacingHUD
                            velocity={scrollVelocity}
                            currentLap={currentSection + 1}
                            totalLaps={6}
                        />

                        {/* Navigation */}
                        <Navbar currentSection={currentSection} />

                        {/* Main Content */}
                        <main className="relative">
                            <Hero />
                            <About />
                            <Skills />
                            <Projects />
                            <Experience />
                            <Contact />
                        </main>
                    </>
                )}
            </div>
        </ScrollContext.Provider>
    );
}

export default App;
