// scripts/seed-projects.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleProjects = [
  {
    title: "Zaesar - Multi-Perspective News Platform",
    description: "An AI-powered news website that helps users view multiple perspectives on current news. Includes a children’s section with simplified, age-specific news.",
    link: "https://zaesar.com",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    githubUrl: "https://github.com/shabeer2520/zaesar",
    liveUrl: "https://zaesar.com",
    technologies: ["Next.js", "Tailwind CSS", "OpenAI API", "Clerk", "Prisma", "Planetscale"],
    category: "WEB",
    featured: true,
    date: new Date("2025-03-20"),
    order: 1
  },
  {
    title: "Offline Notes App",
    description: "A simple and fast offline-first note-taking app built with Expo React Native. Supports rich-text formatting and local storage.",
    link: "https://github.com/shabeer2520/offline-notes",
    image: "https://images.pexels.com/photos/6362464/pexels-photo-6362464.jpeg",
    githubUrl: "https://github.com/shabeer2520/offline-notes",
    liveUrl: "https://github.com/shabeer2520/offline-notes",
    technologies: ["React Native", "Expo", "AsyncStorage"],
    category: "MOBILE",
    featured: true,
    date: new Date("2025-02-10"),
    order: 2
  },
  {
    title: "E-Commerce Platform",
    description: "A scalable eCommerce web application for mobile and web, built with React Native and Next.js. Features product listings, checkout, and order tracking.",
    link: "https://ecommerce-shabeer.vercel.app",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
    githubUrl: "https://github.com/shabeer2520/ecommerce-platform",
    liveUrl: "https://ecommerce-shabeer.vercel.app",
    technologies: ["Next.js", "React Native", "Tailwind CSS", "Prisma", "Stripe"],
    category: "WEB",
    featured: false,
    date: new Date("2024-12-15"),
    order: 3
  },
  {
    title: "Admin Dashboard",
    description: "A clean and modern admin dashboard built using Next.js with server-side rendering, chart visualizations, and role-based access.",
    link: "https://github.com/shabeer2520/admin-dashboard",
    image: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg",
    githubUrl: "https://github.com/shabeer2520/admin-dashboard",
    liveUrl: "https://admin-dashboard-shabeer.vercel.app",
    technologies: ["Next.js", "Tailwind CSS", "Recharts", "Prisma"],
    category: "WEB",
    featured: false,
    date: new Date("2024-11-02"),
    order: 4
  },
  {
    title: "Gym & Fitness Info App",
    description: "A no-login fitness info app tailored for different body types. Includes calorie calculators, exercise tips, and a built-in pedometer.",
    link: "https://github.com/shabeer2520/gym-app",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    githubUrl: "https://github.com/shabeer2520/gym-app",
    liveUrl: "https://github.com/shabeer2520/gym-app",
    technologies: ["React Native", "Expo", "Redux", "Local Storage"],
    category: "MOBILE",
    featured: false,
    date: new Date("2024-10-12"),
    order: 5
  }
];

async function main() {
  try {
    console.log('🌱 Starting projects seed...');
    const existingCount = await prisma.project.count();

    if (existingCount > 0) {
      console.log(`✅ Found ${existingCount} existing projects, skipping seeding`);
      return;
    }

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
