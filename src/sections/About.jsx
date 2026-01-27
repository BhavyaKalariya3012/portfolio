import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, timeline, stats } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.from('.about-header', {
                y: 60, opacity: 0, duration: 1,
                scrollTrigger: { trigger: '.about-header', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.about-content', {
                y: 40, opacity: 0, duration: 0.8,
                scrollTrigger: { trigger: '.about-content', start: 'top 80%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.stat-item', {
                y: 30, opacity: 0, duration: 0.6, stagger: 0.1,
                scrollTrigger: { trigger: '.stats-container', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.race-milestone', {
                x: -50, opacity: 0, duration: 0.8, stagger: 0.15,
                scrollTrigger: { trigger: '.race-timeline', start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    const getPositionIcon = (position) => {
        if (position === 1) return '🏆';
        if (position <= 3) return '🥈';
        if (position <= 5) return '🥉';
        return '🏁';
    };

    return (
        <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Track divider */}
            <div className="track-divider absolute top-0 left-0 right-0" />

            <div className="section-container">
                {/* Section Header */}
                <div className="about-header text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-lg carbon-glass text-racing-blue font-racing text-sm tracking-widest mb-4">
                        LAP 2 • DRIVER PROFILE
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-racing font-bold mb-4">
                        Meet The <span className="gradient-racing">Driver</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A passionate developer on a mission to create blazing-fast digital experiences
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* About Content */}
                    <div className="about-content">
                        <div className="carbon-glass rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
                            {/* Racing stripe accent */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-f1-red via-racing-blue to-f1-red" />

                            <p className="text-gray-300 leading-relaxed mb-6 pl-4">
                                {personalInfo.description}
                            </p>
                            <p className="text-gray-400 leading-relaxed pl-4">
                                Like an F1 team chasing performance gains, I constantly optimize, iterate, and push boundaries.
                                Currently mastering React ecosystem, exploring 3D web experiences, and sharpening problem-solving
                                skills through competitive programming.
                            </p>
                        </div>

                        {/* Race Stats Grid */}
                        <div className="stats-container grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item pit-card rounded-xl p-5 text-center group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="font-racing text-3xl md:text-4xl font-bold gradient-racing mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Race Timeline */}
                    <div className="race-timeline">
                        <h3 className="font-racing text-xl font-semibold mb-8 text-white flex items-center gap-3">
                            <span className="w-8 h-8 rounded bg-f1-red flex items-center justify-center text-sm">🏎️</span>
                            Race Progression
                        </h3>

                        <div className="relative">
                            {/* Track line */}
                            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-f1-red via-racing-blue to-racing-gold" />

                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="race-milestone relative pl-16 pb-10 last:pb-0"
                                >
                                    {/* Position marker */}
                                    <div className="absolute left-0 w-12 h-12 rounded-xl bg-carbon-50 border-2 border-f1-red flex items-center justify-center text-xl shadow-glow-red">
                                        {getPositionIcon(item.position)}
                                    </div>

                                    {/* Content */}
                                    <div className="pit-card rounded-xl p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-racing px-3 py-1 rounded bg-f1-red/20 text-f1-red text-xs tracking-wider">
                                                {item.year}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                LAP {item.lap} • P{item.position}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2 font-racing">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom corner accents */}
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-f1-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-racing-blue/10 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default About;
