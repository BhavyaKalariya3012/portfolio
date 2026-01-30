// ===== Personal Info =====
export const personalInfo = {
    name: "Bhavya",
    role: "Web Developer",
    tagline: "Speed. Precision. Performance.",
    description: "A passionate web developer who builds blazing-fast, pixel-perfect digital experiences. Like an F1 engineer, I obsess over every millisecond of performance and every detail of the user interface.",
    email: "bhavya@example.com",
    github: "https://github.com/BhavyaKalariya3012",
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
        title: "QueryWhisperer",
        description: "Natural language to SQL chatbot powered by Vanna AI, Ollama (local LLM), and Chainlit. Ask questions about your data in plain English and get SQL queries automatically.",
        tech: ["Python", "Vanna AI", "Ollama", "Chainlit", "SQLite"],
        github: "https://github.com/BhavyaKalariya3012/QueryWhisperer",
        live: "",
        featured: true,
        carNumber: "01",
        teamColor: "#00D2BE",
        team: "Mercedes",
        carImage: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png"
    },
    {
        id: 2,
        title: "Student Engagement Analyzer",
        description: "AI-powered web app that analyzes student engagement in recorded Zoom lectures using emotion recognition. Detects faces, classifies emotions, and generates interactive engagement reports.",
        tech: ["Python", "TensorFlow", "OpenCV", "Streamlit", "MobileNetV2"],
        github: "https://github.com/BhavyaKalariya3012/student-attention-analyze",
        live: "",
        featured: true,
        carNumber: "02",
        teamColor: "#FF8000",
        team: "McLaren",
        carImage: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png"
    },
    {
        id: 3,
        title: "3D Portfolio",
        description: "This F1-inspired interactive 3D portfolio showcasing speed and precision.",
        tech: ["React", "Three.js", "GSAP", "Tailwind"],
        github: "https://github.com/BhavyaKalariya3012",
        live: "#",
        featured: true,
        carNumber: "03",
        teamColor: "#3671C6",
        team: "Red Bull",
        carImage: "https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png"
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
