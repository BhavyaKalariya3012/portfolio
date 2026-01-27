import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences, raceStats } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience, index }) => {
    const getTypeColor = (type) => {
        const colors = {
            learning: '#FF1801',
            projects: '#00D2FF',
            contribution: '#FFD700'
        };
        return colors[type] || colors.learning;
    };

    return (
        <motion.div
            className="experience-stat pit-card rounded-2xl p-6 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Lap time badge */}
            <div className="flex items-center justify-between mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: getTypeColor(experience.type) }}
                >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="font-racing text-lg text-racing-blue">
                    {experience.lapTime}
                </div>
            </div>

            <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 font-medium">
                    {experience.period}
                </span>
            </div>

            <h3 className="font-racing text-xl font-semibold text-white mb-1 group-hover:text-glow-red transition-all">
                {experience.title}
            </h3>
            <p className="text-f1-red text-sm font-medium mb-3">{experience.organization}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{experience.description}</p>

            {/* Achievements as checkpoints */}
            <div className="flex flex-wrap gap-2">
                {experience.achievements.map((achievement, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10"
                    >
                        ✓ {achievement}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.from('.experience-header', {
                y: 60, opacity: 0, duration: 1,
                scrollTrigger: { trigger: '.experience-header', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.race-stat-card', {
                scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.1,
                scrollTrigger: { trigger: '.race-stats-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Track divider */}
            <div className="track-divider absolute top-0 left-0 right-0" />

            <div className="section-container">
                {/* Section Header */}
                <div className="experience-header text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-lg carbon-glass text-racing-blue font-racing text-sm tracking-widest mb-4">
                        LAP 5 • RACE STATISTICS
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-racing font-bold mb-4">
                        Championship <span className="gradient-racing">Stats</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Performance data and achievements throughout the season
                    </p>
                </div>

                {/* Race Stats Dashboard */}
                <div className="race-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto">
                    {Object.entries(raceStats).map(([key, value], index) => (
                        <motion.div
                            key={key}
                            className="race-stat-card carbon-glass rounded-xl p-4 text-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <div className="font-racing text-2xl md:text-3xl font-bold gradient-racing mb-1">
                                {value}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">
                                {key === 'fastestLaps' ? 'DSA Solved' : key}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Experience Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>

                {/* Championship Focus */}
                <motion.div
                    className="mt-16 max-w-3xl mx-auto carbon-glass rounded-2xl p-8 text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-f1-red" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-racing-blue" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-racing-blue" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-f1-red" />

                    <h3 className="font-racing text-2xl font-bold text-white mb-2">
                        🧠 Problem Solving Focus
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Dedicated to DSA practice with consistent daily problem solving
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5">
                            <div className="font-racing text-2xl font-bold gradient-racing">200+</div>
                            <div className="text-sm text-gray-400">Problems</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <div className="font-racing text-2xl font-bold gradient-racing">Daily</div>
                            <div className="text-sm text-gray-400">Practice</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <div className="font-racing text-2xl font-bold gradient-racing">Active</div>
                            <div className="text-sm text-gray-400">Contests</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-racing-blue/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Experience;
