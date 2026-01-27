import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const F1Loader = ({ progress = 0 }) => {
    const [rpmValue, setRpmValue] = useState(0);
    const [statusText, setStatusText] = useState("SYSTEMS CHECK");

    // Simulate RPM climbing with progress
    useEffect(() => {
        const targetRpm = Math.floor((progress / 100) * 18000);
        const interval = setInterval(() => {
            setRpmValue(prev => {
                const diff = targetRpm - prev;
                return prev + Math.sign(diff) * Math.min(Math.abs(diff), 500);
            });
        }, 50);
        return () => clearInterval(interval);
    }, [progress]);

    // Update status text based on progress
    useEffect(() => {
        if (progress < 20) setStatusText("SYSTEMS CHECK");
        else if (progress < 40) setStatusText("LOADING TELEMETRY");
        else if (progress < 60) setStatusText("WARMING ENGINES");
        else if (progress < 80) setStatusText("FINAL CHECKS");
        else if (progress < 100) setStatusText("READY TO RACE");
        else setStatusText("GO GO GO!");
    }, [progress]);

    // Race light sequence
    const lights = [
        progress >= 20,
        progress >= 40,
        progress >= 60,
        progress >= 80,
        progress >= 100
    ];

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon overflow-hidden"
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 24, 1, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 24, 1, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 bg-gradient-radial from-f1-red/5 via-transparent to-transparent" />

            {/* F1 Race Lights */}
            <div className="flex gap-4 mb-12">
                {lights.map((lit, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: lit ? 1 : 0.8,
                            opacity: lit ? 1 : 0.3
                        }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 ${lit
                                ? 'bg-f1-red border-f1-red shadow-glow-red'
                                : 'bg-carbon-100 border-gray-700'
                            }`}
                    />
                ))}
            </div>

            {/* Tire Spinner */}
            <div className="relative mb-8">
                <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Tire outer */}
                    <div className="absolute inset-0 rounded-full border-[12px] md:border-[16px] border-gray-800" />
                    {/* Tire tread pattern */}
                    <div className="absolute inset-2 rounded-full border-4 border-dashed border-gray-600" />
                    {/* Wheel rim */}
                    <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-800" />
                    </div>
                    {/* Red accent on rim */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-8 md:w-4 md:h-10 bg-f1-red rounded-sm" />
                </motion.div>

                {/* Exhaust glow effect */}
                <motion.div
                    className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-4 rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #FF1801, #FF6B35, transparent)'
                    }}
                    animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                />
            </div>

            {/* RPM Counter */}
            <div className="mb-6 text-center">
                <div className="font-racing text-4xl md:text-6xl font-black text-white tracking-wider">
                    <span className="text-f1-red">{rpmValue.toLocaleString()}</span>
                    <span className="text-gray-500 text-xl md:text-2xl ml-2">RPM</span>
                </div>
            </div>

            {/* Progress Bar (Pit Lane Style) */}
            <div className="w-64 md:w-80 mb-4">
                <div className="h-3 bg-carbon-50 rounded-full overflow-hidden border border-gray-700">
                    <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(90deg, #FF1801, #FF4444, #00D2FF)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Status Text */}
            <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-racing text-sm md:text-base text-racing-blue tracking-[0.3em] uppercase"
            >
                {statusText}
            </motion.p>

            {/* Progress percentage */}
            <p className="mt-4 font-mono text-gray-500 text-sm">
                {Math.floor(progress)}%
            </p>

            {/* Checkered flag corners */}
            <div className="absolute bottom-0 left-0 w-20 h-20 checkered-flag opacity-20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 checkered-flag opacity-20" />
        </motion.div>
    );
};

export default F1Loader;
