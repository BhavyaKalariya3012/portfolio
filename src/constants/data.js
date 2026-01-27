// ===== Personal Info =====
export const personalInfo = {
    name: "Bhavya",
    role: "Web Developer",
    tagline: "Speed. Precision. Performance.",
    description: "A passionate web developer who builds blazing-fast, pixel-perfect digital experiences. Like an F1 engineer, I obsess over every millisecond of performance and every detail of the user interface.",
    email: "bhavya@example.com",
    github: "https://github.com/bhavya",
    linkedin: "https://linkedin.com/in/bhavya",
    location: "India",
    raceNumber: "01" // Driver number for F1 theme
};

// ===== Navigation Links =====
export const navLinks = [
    { name: "Grid", href: "#home", lap: 1 },
    { name: "Driver", href: "#about", lap: 2 },
    { name: "Telemetry", href: "#skills", lap: 3 },
    { name: "Garage", href: "#projects", lap: 4 },
    { name: "Stats", href: "#experience", lap: 5 },
    { name: "Finish", href: "#contact", lap: 6 }
];

// ===== Skills Data (Telemetry Style) =====
export const skills = [
    {
        name: "React",
        level: 85,
        color: "#61DAFB",
        category: "frontend",
        topSpeed: "350 km/h"
    },
    {
        name: "JavaScript",
        level: 90,
        color: "#F7DF1E",
        category: "frontend",
        topSpeed: "380 km/h"
    },
    {
        name: "HTML5",
        level: 95,
        color: "#E34F26",
        category: "frontend",
        topSpeed: "400 km/h"
    },
    {
        name: "CSS3",
        level: 90,
        color: "#1572B6",
        category: "frontend",
        topSpeed: "380 km/h"
    },
    {
        name: "Three.js",
        level: 70,
        color: "#000000",
        category: "frontend",
        topSpeed: "300 km/h"
    },
    {
        name: "C++",
        level: 75,
        color: "#00599C",
        category: "programming",
        topSpeed: "320 km/h"
    },
    {
        name: "DSA",
        level: 70,
        color: "#FF1801",
        category: "programming",
        topSpeed: "300 km/h"
    },
    {
        name: "Git",
        level: 80,
        color: "#F05032",
        category: "tools",
        topSpeed: "340 km/h"
    }
];

// ===== Projects Data (Garage Cars) =====
export const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured online shopping platform with cart functionality, user authentication, and payment integration.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com/bhavya/ecommerce",
        live: "https://ecommerce-demo.vercel.app",
        featured: true,
        carNumber: "01",
        teamColor: "#FF1801"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A beautiful task manager with drag-and-drop functionality, categories, and real-time sync.",
        tech: ["React", "Firebase", "Tailwind CSS"],
        github: "https://github.com/bhavya/taskapp",
        live: "https://taskapp-demo.vercel.app",
        featured: true,
        carNumber: "02",
        teamColor: "#00D2FF"
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather tracking app with beautiful visualizations and 7-day forecasts.",
        tech: ["JavaScript", "OpenWeather API", "Chart.js"],
        github: "https://github.com/bhavya/weather",
        live: "https://weather-demo.vercel.app",
        featured: false,
        carNumber: "03",
        teamColor: "#FFD700"
    },
    {
        id: 4,
        title: "3D Portfolio",
        description: "This F1-inspired interactive 3D portfolio showcasing speed and precision.",
        tech: ["React", "Three.js", "GSAP", "Tailwind"],
        github: "https://github.com/bhavya/portfolio",
        live: "#",
        featured: true,
        carNumber: "04",
        teamColor: "#FF1801"
    }
];

// ===== Timeline Data (Race Progression) =====
export const timeline = [
    {
        year: "2024",
        title: "Pole Position",
        description: "Advanced web development with React ecosystem, Three.js, and 3D web experiences. Leading the pack.",
        lap: 4,
        position: 1,
        icon: "trophy"
    },
    {
        year: "2023",
        title: "Gaining Speed",
        description: "JavaScript mastery and React development. First interactive web applications launched.",
        lap: 3,
        position: 3,
        icon: "speed"
    },
    {
        year: "2022",
        title: "Grid Start",
        description: "HTML & CSS foundations. First static websites. Discovered passion for web development.",
        lap: 2,
        position: 5,
        icon: "flag"
    },
    {
        year: "2021",
        title: "Rookie Season",
        description: "Started learning C++ and programming basics. Introduction to algorithms.",
        lap: 1,
        position: 10,
        icon: "start"
    }
];

// ===== Experience Data (Race Stats) =====
export const experiences = [
    {
        title: "Competitive Programming",
        organization: "LeetCode & Codeforces",
        period: "2023 - Present",
        description: "Daily DSA problem solving. Contest participation. Building algorithmic racing mind.",
        achievements: ["200+ Problems", "Active Contests", "Algorithm Mastery"],
        type: "learning",
        lapTime: "1:23.456"
    },
    {
        title: "Web Development Projects",
        organization: "Self-Learning",
        period: "2022 - Present",
        description: "Building real-world projects. Learning by racing through challenges.",
        achievements: ["10+ Projects", "React Pro", "Full-Stack Basics"],
        type: "projects",
        lapTime: "1:24.789"
    },
    {
        title: "Open Source Contribution",
        organization: "GitHub",
        period: "2023 - Present",
        description: "Contributing to the racing team. Collaboration and Git workflows.",
        achievements: ["First PR Merged", "Code Reviews", "Team Player"],
        type: "contribution",
        lapTime: "1:25.012"
    }
];

// ===== Race Statistics =====
export const raceStats = {
    races: "10+",
    wins: "4",
    podiums: "8",
    fastestLaps: "200+",
    points: "156"
};

// ===== Stats Display =====
export const stats = [
    { number: "10+", label: "Projects Completed", icon: "trophy" },
    { number: "200+", label: "DSA Problems Solved", icon: "speed" },
    { number: "8+", label: "Technologies Mastered", icon: "tools" },
    { number: "1+", label: "Years Racing", icon: "timer" }
];
