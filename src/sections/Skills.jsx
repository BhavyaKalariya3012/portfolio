import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// Speedometer component for skill visualization
const Speedometer = ({ skill, index }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (skill.level / 100) * circumference;

    return (
        <motion.div
            className="skill-gauge pit-card rounded-xl p-4 text-center group"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* Speedometer SVG */}
            <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background ring */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="8"
                    />
                    {/* Progress ring */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF1801" />
                            <stop offset="100%" stopColor="#00D2FF" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-racing text-xl font-bold text-white">{skill.level}</span>
                    <span className="text-[10px] text-gray-500 uppercase">%</span>
                </div>
            </div>

            {/* Skill name */}
            <h3 className="font-racing text-base font-semibold text-white group-hover:text-glow-red transition-all">
                {skill.name}
            </h3>

            {/* Top speed */}
            <div className="text-xs text-racing-blue font-mono">
                {skill.topSpeed}
            </div>
        </motion.div>
    );
};

// Telemetry bar for alternate skill display
const TelemetryBar = ({ skill, index }) => {
    return (
        <motion.div
            className="telemetry-item carbon-glass rounded-lg p-4 group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white text-sm">{skill.name}</span>
                <span className="font-racing text-racing-blue text-sm">{skill.level}%</span>
            </div>
            <div className="h-2 bg-carbon-50 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                />
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.from('.skills-header', {
                y: 60, opacity: 0, duration: 1,
                scrollTrigger: { trigger: '.skills-header', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.skill-gauge', {
                y: 50, opacity: 0, duration: 0.8, stagger: 0.1,
                scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    const frontendSkills = skills.filter(s => s.category === 'frontend');
    const programmingSkills = skills.filter(s => s.category === 'programming');
    const toolsSkills = skills.filter(s => s.category === 'tools');

    return (
        <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Track divider */}
            <div className="track-divider absolute top-0 left-0 right-0" />

            <div className="section-container">
                {/* Section Header */}
                <div className="skills-header text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-lg carbon-glass text-racing-blue font-racing text-sm tracking-widest mb-4">
                        LAP 3 • TELEMETRY DATA
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-racing font-bold mb-4">
                        Performance <span className="gradient-racing">Dashboard</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real-time telemetry of technical capabilities and performance metrics
                    </p>
                </div>

                {/* Skills Grid - Speedometers */}
                <div className="skills-grid">
                    {/* Frontend */}
                    <div className="mb-8">
                        <h3 className="font-racing text-lg font-semibold text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded bg-gradient-to-br from-f1-red to-racing-blue flex items-center justify-center text-sm">
                                🎨
                            </span>
                            Frontend Engineering
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {frontendSkills.map((skill, index) => (
                                <Speedometer key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Programming */}
                    <div className="mb-8">
                        <h3 className="font-racing text-lg font-semibold text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded bg-gradient-to-br from-racing-blue to-racing-gold flex items-center justify-center text-sm">
                                💻
                            </span>
                            Programming
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                            {programmingSkills.map((skill, index) => (
                                <TelemetryBar key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="font-racing text-lg font-semibold text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded bg-gradient-to-br from-racing-gold to-f1-red flex items-center justify-center text-sm">
                                🛠️
                            </span>
                            Tools & Platforms
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                            {toolsSkills.map((skill, index) => (
                                <TelemetryBar key={skill.name} skill={skill} index={index + programmingSkills.length} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional tech */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 mb-6 font-racing text-sm tracking-wide">
                        DEVELOPING NEW CAPABILITIES
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'WebGL'].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 rounded-lg carbon-glass text-sm text-gray-300 hover:text-white hover:border-racing-blue/50 transition-colors cursor-default border border-transparent"
                            >
                                + {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-racing-blue/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-f1-red/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Skills;
