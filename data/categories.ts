export type Category = {
  id: string;
  name: string;
  projectCount: number;
  percentage: number;
  gradientColors: [string, string];
};

export const categories: Category[] = [
  {
    id: "web-design",
    name: "Web Design",
    projectCount: 5,
    percentage: 60,
    gradientColors: ["#667EEA", "#764BA2"],
  },
  {
    id: "web-development",
    name: "Web Development",
    projectCount: 10,
    percentage: 45,
    gradientColors: ["#3377FF", "#764BA2"],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    projectCount: 8,
    percentage: 75,
    gradientColors: ["#F093FB", "#F5576C"],
  },
  {
    id: "ui-ux",
    name: "UI/UX",
    projectCount: 12,
    percentage: 30,
    gradientColors: ["#4FACFE", "#00F2FE"],
  },
  {
    id: "marketing",
    name: "Marketing",
    projectCount: 6,
    percentage: 85,
    gradientColors: ["#43E97B", "#38F9D7"],
  },
  {
    id: "content-writing",
    name: "Content Writing",
    projectCount: 4,
    percentage: 50,
    gradientColors: ["#FA709A", "#FEE140"],
  },
];

