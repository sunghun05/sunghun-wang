export const profile = {
    name: "Sunghun Wang",
    title: "Computer Software Undergraduate Student",
    bio: "Researching, Studying, and Building on Edge AI and Software Engineering.",
    email: "sunghun051107@gmail.com",
};
export const about = {
    en: "I am an undergraduate student at Soonchunhyang University, majoring in Computer Software Engineering. I have a strong passion for researching efficient AI models for edge devices. Currently, I'm studying Computer Vision Models using edge devices and NPUs.",
    ko: "저는 순천향대학교 컴퓨터 소프트웨어 공학과 학부생입니다. 엣지 디바이스에서 효율적인 AI 모델을 연구하는 데 큰 열정을 가지고 있습니다. 현재는 엣지 디바이스와 NPU를 활용한 컴퓨터 비전 모델을 연구하고 있습니다."
};

export const researchInterests = [
    "Edge AI",
    "Computer Vision",
    "Reinforcement Learning",
    "Software Engineering",
];

export const career = [
    {
        company: "INS-LAB",
        role: "Undergraduate Research Assistant",
        duration: "April 2024 - Present",
        description: "",
    },
    {
        company: "Soonchunhyang University",
        role: "Undergraduate Student",
        duration: "March 2024 - Present",
        description: "",
    }
];

export const papers = [];

// export const papers = [
//     {
//         title: "Paper Title 1",
//         conference: "Conference Name",
//         year: "2025",
//         link: "#",
//     }
// ];

export const projects = [
    {
        title: "LabOps Frontend",
        description: "Developed a frontend for LabOps, a platform for managing laboratory AI development.",
        techStack: ["React", "JavaScript", "CSS"],
        link: "#",
    },
    {
        title: "Envac Cleanet",
        description: "Development of a smart trash can and illegal dumping detection algorithm for smart cities.",
        techStack: ["Hailo-8", "Linux", "Python", "PyTorch"],
        link: "#",
    },
];

export const social = {
    github: "https://github.com/sunghun05",
    blog: "https://sunghun05.github.io",
};

export const profileTable = [
    { label: "Role", value: profile.title },
    { label: "Email", value: profile.email, type: "email" },
    { label: "Website", value: social.blog, type: "link", text: "Official Website" },
    { label: "Blog", value: "/blog", type: "internal-link", text: "Visit Blog" },
    { label: "GitHub", value: social.github, type: "link", text: "GitHub Profile" },
];