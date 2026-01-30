import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../constants/data';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    // Get your free access key from https://web3forms.com
    // Sign up at web3forms.com and get your access key
    const WEB3FORMS_ACCESS_KEY = '3750e36c-4ed9-456c-95cf-488fc46f79fb'; // Replace with your actual key from web3forms.com

    useEffect(() => {
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.from('.contact-header', {
                y: 60, opacity: 0, duration: 1,
                scrollTrigger: { trigger: '.contact-header', start: 'top 85%', toggleActions: 'play none none reverse' }
            });

            gsap.from('.contact-card', {
                y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
                scrollTrigger: { trigger: '.contact-cards', start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New message from ${formData.name} - Portfolio Contact`,
                })
            });

            const result = await response.json();
            console.log('Web3Forms response:', result);

            if (result.success) {
                setSubmitStatus({ 
                    type: 'success', 
                    message: '🏁 Message sent successfully! I\'ll get back to you soon.' 
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: `❌ ${error.message || 'Failed to send message. Please try again or email directly.'}` 
            });
        } finally {
            setIsSubmitting(false);
            // Clear status after 5 seconds
            setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
        }
    };

    const socialLinks = [
        {
            name: 'GitHub',
            href: personalInfo.github,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            href: personalInfo.linkedin,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'Email',
            href: `mailto:${personalInfo.email}`,
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Finish line checkered pattern at top */}
            <div className="absolute top-0 left-0 right-0 h-8 checkered-flag opacity-30" />

            <div className="section-container">
                {/* Section Header */}
                <div className="contact-header text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-lg carbon-glass text-racing-gold font-racing text-sm tracking-widest mb-4">
                        LAP 6 • FINISH LINE
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-racing font-bold mb-4">
                        Cross The <span className="gradient-racing">Finish Line</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ready to work together? Let's connect and build something fast!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div>
                        {/* Trophy / Champion Message */}
                        <motion.div
                            className="carbon-glass rounded-2xl p-6 mb-8 text-center relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="font-racing text-xl text-white mb-2">Let's Win Together</h3>
                            <p className="text-gray-400 text-sm">
                                Looking for internship opportunities and exciting projects
                            </p>

                            {/* Gold glow */}
                            <div className="absolute inset-0 bg-gradient-radial from-racing-gold/10 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Social Links */}
                        <div className="contact-cards space-y-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target={link.name !== 'Email' ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="contact-card pit-card rounded-xl p-5 flex items-center gap-4 group"
                                    whileHover={{ x: 8 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-f1-red to-racing-blue flex items-center justify-center text-white">
                                        {link.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-medium group-hover:text-glow-red transition-all">
                                            {link.name}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {link.name === 'Email' ? personalInfo.email : `@${personalInfo.name.toLowerCase()}`}
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-f1-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>

                        {/* Location */}
                        <div className="mt-6 carbon-glass rounded-xl p-4">
                            <p className="text-gray-400 text-sm">
                                🏁 Based in <span className="text-white font-medium">{personalInfo.location}</span>
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="carbon-glass rounded-2xl p-6 md:p-8">
                        <h3 className="font-racing text-lg text-white mb-6 flex items-center gap-2">
                            <span className="text-f1-red">📡</span> Send a Message
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Driver Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-carbon-50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-f1-red focus:ring-1 focus:ring-f1-red transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Team Radio
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-carbon-50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-f1-red focus:ring-1 focus:ring-f1-red transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Race Brief
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-carbon-50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-f1-red focus:ring-1 focus:ring-f1-red transition-colors resize-none"
                                    placeholder="Your message..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl btn-racing text-white font-racing font-semibold tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Transmitting...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>

                            {/* Status Message */}
                            {submitStatus.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-xl text-sm font-medium text-center ${
                                        submitStatus.type === 'success' 
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}
                                >
                                    {submitStatus.message}
                                </motion.div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-white/10">
                <div className="section-container">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © 2024 {personalInfo.name}. Built with React, Three.js & 🏎️
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">P1</span>
                            <div className="w-3 h-3 rounded-full bg-f1-red animate-pulse" />
                            <span className="font-racing text-sm text-white">RACE COMPLETE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Victory glow */}
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-racing-gold/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Contact;
