import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

// Garage car card component
const GarageCard = ({ project, index, onClick }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 8, y: -x * 8 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`garage-car pit-card rounded-2xl overflow-hidden cursor-pointer group relative ${project.featured ? 'md:col-span-2' : ''
                }`}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* Project "car" visual */}
            <div className="relative h-48 md:h-56 bg-gradient-to-br from-carbon-100 to-carbon overflow-hidden">
                {/* Racing number */}
                <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-lg flex items-center justify-center font-racing text-xl font-black text-white"
                    style={{ backgroundColor: project.teamColor }}
                >
                    {project.carNumber}
                </div>

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-racing-gold/90 text-xs font-racing font-bold text-carbon tracking-wider">
                        POLE POSITION
                    </div>
                )}

                {/* Abstract car silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg className="w-48 h-32" viewBox="0 0 200 80" fill="none">
                        <path d="M10 60 L30 40 L80 35 L120 30 L160 35 L190 50 L190 60 L10 60 Z" fill="currentColor" />
                        <circle cx="45" cy="60" r="15" fill="currentColor" />
                        <circle cx="155" cy="60" r="15" fill="currentColor" />
                    </svg>
                </div>

                {/* Team color stripe */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-2"
                    style={{ backgroundColor: project.teamColor }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="p-6 relative" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="font-racing text-xl font-semibold text-white mb-2 group-hover:text-glow-red transition-all">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        whileHover={{ x: 3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                        </svg>
                        Code
                    </motion.a>
                    <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-f1-red hover:text-f1-red-glow transition-colors"
                        whileHover={{ x: 3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                    </motion.a>
                </div>
            </div>

            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${project.teamColor}10, transparent)`,
                    boxShadow: `inset 0 0 60px ${project.teamColor}20`
                }}
            />
        </motion.div>
    );
};

// Project detail modal
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/95 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="carbon-glass max-w-2xl w-full rounded-2xl p-6 md:p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full carbon-glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Car number */}
                <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-racing text-2xl font-black text-white mb-4"
                    style={{ backgroundColor: project.teamColor }}
                >
                    {project.carNumber}
                </div>

                <h3 className="font-racing text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-f1-red/20 text-f1-red text-sm font-medium">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-xl carbon-glass text-center font-medium text-white hover:bg-white/10 transition-colors"
                    >
                        View Code
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-xl btn-racing text-center font-medium text-white"
                    >
                        Launch Demo
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.from('.projects-header', {
                y: 60, opacity: 0, duration: 1,
                scrollTrigger: { trigger: '.projects-header', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.garage-car', {
                y: 80, opacity: 0, duration: 0.8, stagger: 0.15,
                scrollTrigger: { trigger: '.garage-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Track divider */}
            <div className="track-divider absolute top-0 left-0 right-0" />

            <div className="section-container">
                {/* Section Header */}
                <div className="projects-header text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-lg carbon-glass text-racing-blue font-racing text-sm tracking-widest mb-4">
                        LAP 4 • PIT GARAGE
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-racing font-bold mb-4">
                        The <span className="gradient-racing">Garage</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        High-performance projects built with precision engineering
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="garage-grid grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <GarageCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* View more */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.a
                        href="https://github.com/bhavya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg carbon-glass text-gray-300 hover:text-white font-medium border border-transparent hover:border-racing-blue/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="font-racing">View Full Garage</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Decorative */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-f1-red/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Projects;
