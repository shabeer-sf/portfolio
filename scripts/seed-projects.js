// scripts/seed-projects.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProjects = [
  {
    title: "E-commerce Website",
    description: "A fully functional e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, user authentication, and payment processing.",
    link: "https://ecommerce-example.com",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    githubUrl: "https://github.com/user/ecommerce-project",
    liveUrl: "https://ecommerce-example.com",
    technologies: ["Next.js", "React", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL"],
    category: "WEB",
    featured: true,
    date: new Date("2024-01-15"),
    order: 1
  },
  {
    title: "Fitness Tracking App",
    description: "A mobile application built with React Native that helps users track their workouts, nutrition, and fitness goals. Includes charts and analytics to visualize progress.",
    link: "https://fitness-app-example.com",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    githubUrl: "https://github.com/user/fitness-app",
    liveUrl: "https://fitness-app-example.com",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "Chart.js"],
    category: "MOBILE",
    featured: true,
    date: new Date("2023-11-05"),
    order: 2
  },
  {
    title: "Task Management System",
    description: "A project management tool inspired by Trello with drag-and-drop functionality, task assignments, due dates, and team collaboration features.",
    link: "https://task-manager-example.com",
    image: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg",
    githubUrl: "https://github.com/user/task-manager",
    liveUrl: "https://task-manager-example.com",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Docker"],
    category: "WEB",
    featured: false,
    date: new Date("2023-09-20"),
    order: 3
  },
  {
    title: "Weather Forecast API",
    description: "A RESTful API service that provides weather forecasts by city, with historical data and machine learning predictions for long-term forecasts.",
    link: "https://weather-api-example.com",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    githubUrl: "https://github.com/user/weather-api",
    liveUrl: "https://weather-api-example.com",
    technologies: ["Node.js", "Express", "MongoDB", "Python", "TensorFlow", "Docker"],
    category: "BACKEND",
    featured: false,
    date: new Date("2023-07-10"),
    order: 4
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website built with Next.js and Tailwind CSS, featuring a clean design, dark mode, and integration with a headless CMS for content management.",
    link: "https://portfolio-example.com",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    githubUrl: "https://github.com/user/portfolio",
    liveUrl: "https://portfolio-example.com",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    category: "WEB",
    featured: false,
    date: new Date("2023-05-15"),
    order: 5
  }
];

async function main() {
  try {
    console.log('🌱 Starting projects seed...');

    // First, check how many projects we already have
    const existingCount = await prisma.project.count();

    if (existingCount > 0) {
      console.log(`✅ Found ${existingCount} existing projects, skipping seeding`);
      return;
    }

    // Seed all projects
    for (const project of sampleProjects) {
      await prisma.project.create({
        data: project
      });
    }

    console.log(`✅ Successfully seeded ${sampleProjects.length} projects`);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 Projects seed completed successfully!');
  })
  .catch((error) => {
    console.error('❌ Error running seed script:', error);
    process.exit(1);
  });