// scripts/seed-projects.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting detailed project seed...");

  const projects = [
    {
      title: "Personal Portfolio Website",
      slug: "personal-portfolio",
      shortDescription: "A responsive portfolio built with Next.js and Tailwind CSS.",
      longDescription:
        "This project is my personal portfolio showcasing my skills, projects, and contact information. Built with modern technologies and designed to be fully responsive.",
      content: "Full development story of my portfolio site.",
      problem: "Needed a professional online presence to showcase my work.",
      solution: "Developed a responsive, fast, and SEO-friendly site with Next.js.",
      results: "Increased visibility and attracted freelance opportunities.",
      link: "https://yourportfolio.com",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      images: [
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
        "https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg"
      ],
      githubUrl: "https://github.com/yourusername/portfolio",
      showGithub: true,
      liveUrl: "https://yourportfolio.com",
      demoUrl: null,
      technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
      features: ["Responsive design", "Animated transitions", "SEO optimization"],
      challenges: ["Animating layout shifts", "Optimizing for mobile"],
      learnings: ["Advanced Next.js routing", "Image optimization techniques"],
      categorySlug: "web",
      status: "COMPLETED",
      featured: true,
      teamSize: 1,
      duration: "2 weeks",
      client: "Personal",
      role: "Developer & Designer",
      order: 1,
    },
    {
      title: "Restaurant Mobile App",
      slug: "restaurant-mobile-app",
      shortDescription: "Food ordering app built with React Native.",
      longDescription:
        "Cross-platform restaurant application allowing customers to browse menu, place orders, and track delivery.",
      content: "Full app dev with Expo and Firebase backend.",
      problem: "Restaurant needed a way to handle online orders efficiently.",
      solution: "Built a mobile app with push notifications and payment integration.",
      results: "Reduced in-person wait times and increased sales.",
      link: "https://example.com/restaurant-app",
      image: "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg",
      images: [
        "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg",
        "https://images.pexels.com/photos/2693554/pexels-photo-2693554.jpeg"
      ],
      githubUrl: "https://github.com/yourusername/restaurant-app",
      showGithub: true,
      liveUrl: null,
      demoUrl: null,
      technologies: ["React Native", "Expo", "Firebase", "Redux Toolkit"],
      features: ["Push notifications", "Payment gateway", "Order tracking"],
      challenges: ["Cross-platform UI", "Offline functionality"],
      learnings: ["React Native animations", "Push notification setup"],
      categorySlug: "mobile",
      status: "COMPLETED",
      featured: false,
      teamSize: 2,
      duration: "1 month",
      client: "Local Restaurant",
      role: "Lead Developer",
      order: 2,
    },
    {
      title: "E-Commerce Fullstack Platform",
      slug: "ecommerce-fullstack",
      shortDescription: "Fullstack online store with payments.",
      longDescription:
        "A complete e-commerce platform built with Next.js, Node.js, and Stripe integration.",
      content: "Backend handles inventory and orders, frontend is fully responsive.",
      problem: "Client wanted a custom, scalable online store.",
      solution: "Built a fullstack app with secure payment processing.",
      results: "Increased client's online sales by 150% in first quarter.",
      link: "https://yourecommerce.com",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
      images: [
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
        "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg"
      ],
      githubUrl: "https://github.com/yourusername/ecommerce-fullstack",
      showGithub: true,
      liveUrl: "https://yourecommerce.com",
      demoUrl: null,
      technologies: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "Stripe"],
      features: ["Cart system", "Payment integration", "Admin dashboard"],
      challenges: ["Secure payments", "Database optimization"],
      learnings: ["Stripe API", "Database indexing"],
      categorySlug: "fullstack",
      status: "COMPLETED",
      featured: true,
      teamSize: 3,
      duration: "6 weeks",
      client: "Retail Startup",
      role: "Fullstack Developer",
      order: 3,
    },
  ];

  for (const project of projects) {
    const category = await prisma.projectCategory.findFirst({
      where: { slug: project.categorySlug },
    });

    if (!category) {
      console.warn(`⚠ Category with slug "${project.categorySlug}" not found. Skipping "${project.title}".`);
      continue;
    }

    await prisma.project.create({
      data: {
        id: undefined, // let Prisma auto-generate UUID
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        longDescription: project.longDescription,
        content: project.content,
        problem: project.problem,
        solution: project.solution,
        results: project.results,
        link: project.link,
        image: project.image,
        images: project.images,
        githubUrl: project.githubUrl,
        showGithub: project.showGithub,
        liveUrl: project.liveUrl,
        demoUrl: project.demoUrl,
        technologies: project.technologies,
        features: project.features,
        challenges: project.challenges,
        learnings: project.learnings,
        categoryId: category.id,
        status: project.status,
        featured: project.featured,
        teamSize: project.teamSize,
        duration: project.duration,
        client: project.client,
        role: project.role,
        order: project.order,
      },
    });

    console.log(`✅ Added project: ${project.title}`);
  }

  console.log("🎉 Detailed project seed completed!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
