// scripts/seed-services.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleServices = [
  {
    title: "React Native & Flutter App Development",
    slug: "mobile-app-development",
    shortDescription: "Build fast, modern mobile apps using React Native or Flutter.",
    description:
      "I create responsive, high-performance mobile applications with React Native or Flutter, tailored for both Android and iOS. Whether it's a startup MVP or a production-grade app, I ensure quick delivery and excellent UX.",
    process: [
      "Requirement Analysis & Planning",
      "Wireframing & UI/UX Design",
      "Cross-platform Development (React Native/Flutter)",
      "Firebase Integration & Local Storage",
      "Testing and Play Store/App Store deployment"
    ],
    deliverables: [
      "Android & iOS mobile applications",
      "Source code with instructions",
      "App store listing support",
      "Documentation & walkthrough video",
      "Free support for 30 days post-launch"
    ],
    pricing: "Starting from $1,500 - Based on features and complexity",
    duration: "3-8 weeks",
    icon: "Smartphone",
    color: "purple",
    technologies: ["React Native", "Flutter", "Expo", "Firebase", "Redux", "TypeScript", "Dart"],
    featured: true,
    order: 1
  },
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    shortDescription: "Complete website or dashboard development",
    description:
      "I develop responsive, SEO-friendly websites and admin panels using React, Next.js, or PHP on the backend. Perfect for SaaS platforms, dashboards, and dynamic websites.",
    process: [
      "Planning & Wireframing",
      "Frontend UI Development (React/Next.js)",
      "Backend with Node.js or PHP & MySQL",
      "Integration with APIs and Admin Panel",
      "Testing & Deployment"
    ],
    deliverables: [
      "Frontend + Backend codebase",
      "Admin panel (if required)",
      "MySQL or PostgreSQL database setup",
      "Live deployment with hosting setup",
      "Post-launch bug fix support"
    ],
    pricing: "Starting from $2,000",
    duration: "4-10 weeks depending on scope",
    icon: "Code",
    color: "blue",
    technologies: ["React", "Next.js", "Node.js", "PHP", "MySQL", "Tailwind CSS", "Prisma"],
    featured: true,
    order: 2
  },
  {
    title: "API Development (Node.js / PHP)",
    slug: "api-development",
    shortDescription: "Custom REST APIs and database design",
    description:
      "Build powerful, scalable APIs with Node.js or PHP and connect your frontend or mobile app seamlessly with a custom backend. Includes authentication and database integration.",
    process: [
      "API Route Design",
      "Database Schema & Setup",
      "API Development with Authentication",
      "Testing & Documentation",
      "Deployment & Monitoring"
    ],
    deliverables: [
      "Secure API endpoints",
      "Postman collection",
      "MySQL or PostgreSQL schema",
      "Authentication system (JWT/Session)",
      "Basic monitoring setup"
    ],
    pricing: "Starting from $1,000",
    duration: "2-4 weeks",
    icon: "Database",
    color: "orange",
    technologies: ["Node.js", "Express", "JWT", "MySQL", "Prisma", "PHP", "Firebase Auth"],
    featured: false,
    order: 3
  },
  {
    title: "Landing Page / Portfolio Website",
    slug: "landing-page-development",
    shortDescription: "Quick, responsive landing pages",
    description:
      "Need a portfolio or marketing page for your product? I design and develop fast-loading, responsive landing pages using Next.js or pure HTML/CSS.",
    process: [
      "Requirement Collection",
      "Responsive UI Design",
      "SEO & Performance Optimization",
      "Deployment to Vercel/Netlify"
    ],
    deliverables: [
      "Mobile-friendly single-page site",
      "SEO setup",
      "Deployment & domain mapping",
      "Source code"
    ],
    pricing: "Starting from $300",
    duration: "3-5 days",
    icon: "Globe",
    color: "emerald",
    technologies: ["Next.js", "HTML", "Tailwind CSS", "SEO"],
    featured: false,
    order: 4
  },
  {
    title: "Firebase App Setup & Integration",
    slug: "firebase-integration",
    shortDescription: "Firebase authentication, Firestore, hosting and more",
    description:
      "Set up Firebase features like Auth, Firestore DB, Realtime DB, and Hosting for your web or mobile app. Get a reliable, scalable backend without managing servers.",
    process: [
      "Firebase Project Setup",
      "Authentication (Email, Google, etc.)",
      "Database Schema Design",
      "Integration in Mobile/Web App",
      "Deployment & Testing"
    ],
    deliverables: [
      "Firebase project configuration",
      "Integrated Auth and DB",
      "Documentation for usage",
      "Hosting setup (if needed)"
    ],
    pricing: "Starting from $500",
    duration: "1-2 weeks",
    icon: "Cloud",
    color: "amber",
    technologies: ["Firebase Auth", "Firestore", "Realtime DB", "Firebase Hosting"],
    featured: false,
    order: 5
  }
];

async function main() {
  try {
    console.log("🌱 Starting services seed...");
    await prisma.service.deleteMany({});
    console.log("✅ Cleared existing services");

    for (const service of sampleServices) {
      await prisma.service.create({ data: service });
    }

    console.log(`✅ Successfully seeded ${sampleServices.length} services`);
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log("🎉 Services seed completed successfully!"))
  .catch((error) => {
    console.error("❌ Error running seed script:", error);
    process.exit(1);
  });
