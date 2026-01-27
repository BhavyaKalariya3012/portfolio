import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ScrollContext } from '../App';

const RacingHUD = ({ velocity = 0, currentLap = 1, totalLaps = 6 }) => {
    const scrollContext = useContext(ScrollContext);
    const speed = Math.min(Math.floor(velocity * 50), 350);

    return (
        <>
            {/* Top HUD Bar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
                <div className="flex justify-between items-start p-4 md:p-6">
                    {/* Left: Timer/Session */}
                    <div className="hud-panel rounded-lg px-4 py-2 pointer-events-auto">
                        <div className="text-[10px] text-racing-blue uppercase tracking-widest">Session</div>
                        <div className="font-racing text-lg md:text-xl text-white">PORTFOLIO</div>
                    </div>

                    {/* Center: Current Lap */}
                    <div className="hud-panel rounded-lg px-6 py-2 text-center pointer-events-auto">
                        <div className="text-[10px] text-racing-blue uppercase tracking-widest">Lap</div>
                        <div className="font-racing text-2xl md:text-3xl text-white">
                            <span className="text-f1-red">{currentLap}</span>
                            <span className="text-gray-500 text-lg">/{totalLaps}</span>
                        </div>
                    </div>

                    {/* Right: Position */}
                    <div className="hud-panel rounded-lg px-4 py-2 pointer-events-auto">
                        <div className="text-[10px] text-racing-blue uppercase tracking-widest">Position</div>
                        <div className="font-racing text-lg md:text-xl text-racing-gold">P1</div>
                    </div>
                </div>
            </motion.div>

            {/* Left Side: Speed Indicator */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:block"
            >
                <div className="hud-panel rounded-lg p-4">
                    {/* Vertical speed bar */}
                    <div className="h-40 w-4 bg-carbon-50 rounded-full overflow-hidden relative mb-3">
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 rounded-full"
                            style={{
                                background: speed > 250
                                    ? 'linear-gradient(to top, #FF1801, #FF4444)'
                                    : 'linear-gradient(to top, #00D2FF, #44E4FF)'
                            }}
                            animate={{ height: `${(speed / 350) * 100}%` }}
                            transition={{ duration: 0.1 }}
                        />
                        {/* Rev limit marker */}
                        <div className="absolute top-2 left-0 right-0 h-0.5 bg-f1-red" />
                    </div>

                    {/* Speed value */}
                    <div className="text-center">
                        <div className="font-racing text-2xl text-white">{speed}</div>
                        <div className="text-[10px] text-gray-500 uppercase">km/h</div>
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Telemetry */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden lg:block"
            >
                <div className="hud-panel rounded-lg p-3 space-y-3">
                    {/* Throttle */}
                    <div>
                        <div className="text-[8px] text-gray-500 uppercase mb-1">Throttle</div>
                        <div className="h-1.5 w-16 bg-carbon-50 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-green-500 rounded-full"
                                animate={{ width: `${Math.min((velocity / 5) * 100, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Brake */}
                    <div>
                        <div className="text-[8px] text-gray-500 uppercase mb-1">Brake</div>
                        <div className="h-1.5 w-16 bg-carbon-50 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-f1-red rounded-full"
                                animate={{ width: velocity < 0.5 ? '80%' : '0%' }}
                            />
                        </div>
                    </div>

                    {/* DRS */}
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${speed > 200 ? 'bg-green-500' : 'bg-gray-600'}`} />
                        <span className="text-[10px] text-gray-400">DRS</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom: Mini Track Progress */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
                <div className="hud-panel rounded-full px-6 py-2 flex items-center gap-4">
                    {/* Progress dots */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((lap) => (
                            <div
                                key={lap}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${lap < currentLap
                                        ? 'bg-f1-red'
                                        : lap === currentLap
                                            ? 'bg-racing-blue animate-pulse'
                                            : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Sector indicator */}
                    <div className="text-[10px] text-gray-400 font-mono">
                        S{Math.min(Math.ceil(scrollContext.progress * 3) || 1, 3)}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default RacingHUD;
