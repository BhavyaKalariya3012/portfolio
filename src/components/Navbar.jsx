import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, personalInfo } from '../constants/data';

const Navbar = ({ currentSection = 0 }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Desktop Navigation - Top Center */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block"
            >
                <div className="carbon-glass rounded-full px-2 py-2 flex items-center gap-1">
                    {navLinks.map((link, index) => (
                        <motion.button
                            key={link.name}
                            onClick={() => handleNavClick(link.href)}
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentSection === index
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Active indicator */}
                            {currentSection === index && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-gradient-to-r from-f1-red to-racing-blue rounded-full -z-10"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Lap number */}
                            <span className="font-racing text-[10px] text-racing-blue mr-1">
                                L{link.lap}
                            </span>
                            {link.name}
                        </motion.button>
                    ))}
                </div>
            </motion.nav>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                {/* Mobile Menu Button */}
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="carbon-glass w-12 h-12 rounded-xl flex items-center justify-center"
                >
                    <div className="flex flex-col gap-1.5">
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                            className="w-5 h-0.5 bg-f1-red block"
                        />
                        <motion.span
                            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                            className="w-5 h-0.5 bg-white block"
                        />
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                            className="w-5 h-0.5 bg-racing-blue block"
                        />
                    </div>
                </motion.button>
            </div>

            {/* Driver Number Badge - Fixed Bottom Left */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="fixed bottom-6 left-6 z-40 hidden md:block"
            >
                <div className="carbon-glass rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-f1-red to-racing-blue flex items-center justify-center">
                        <span className="font-racing text-lg font-black text-white">
                            {personalInfo.raceNumber}
                        </span>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Driver</div>
                        <div className="font-racing text-sm text-white">{personalInfo.name}</div>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-carbon/95 backdrop-blur-lg z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="absolute right-0 top-0 bottom-0 w-72 carbon-glass p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Driver info */}
                            <div className="mb-8 pb-6 border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-f1-red to-racing-blue flex items-center justify-center">
                                        <span className="font-racing text-2xl font-black text-white">
                                            {personalInfo.raceNumber}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-racing text-xl text-white">{personalInfo.name}</div>
                                        <div className="text-sm text-racing-blue">{personalInfo.role}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Nav Links */}
                            <nav className="space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.name}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${currentSection === index
                                                ? 'bg-f1-red/20 border border-f1-red/50'
                                                : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="font-racing text-lg text-racing-blue">L{link.lap}</span>
                                        <span className={`font-medium ${currentSection === index ? 'text-white' : 'text-gray-400'
                                            }`}>
                                            {link.name}
                                        </span>
                                        {currentSection === index && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-f1-red" />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
