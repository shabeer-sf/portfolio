// scripts/seed-experiences.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleExperiences = [
  {
    company: "Doutya Private Limited",
    location: "Bangalore, India",
    title: "Full Stack Developer",
    description: "Led development of cross-platform mobile applications and SaaS solutions.",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-01-01"),
    isCurrent: true,
    roles: [
      "Developed and maintained cross-platform mobile applications using Expo and React Native, ensuring seamless functionality and performance on both iOS and Android platforms.",
      "Implemented and integrated various third-party services and APIs, such as Firebase, Google Maps, and payment gateways, to extend app functionality and provide a richer user experience.",
      "Worked on Software-as-a-Service (SaaS) solutions, contributing to the digital transformation of businesses."
    ],
    skills: ["React Native", "Expo", "Firebase", "SaaS", "API Integration"],
    order: 1
  },
  {
    company: "Smartwebin Software Development Company",
    location: "Cochin, India",
    title: "Backend Developer",
    description: "Optimized backend systems and led cross-functional teams for project delivery.",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2024-01-01"),
    isCurrent: false,
    roles: [
      "Optimized backend processes in PHP, reducing server response time by 30% and enhancing overall application performance.",
      "Led a cross-functional team to successfully deliver a complex project, meeting all deadlines and exceeding client expectations.",
      "Worked on full-service website and mobile app development projects, improving system efficiency and user experience."
    ],
    skills: ["PHP", "Team Leadership", "Web Development", "Performance Optimization"],
    order: 2
  }
];

async function main() {
  try {
    console.log('🌱 Starting experiences seed...');

    // Delete existing experiences first for a clean slate
    await prisma.experience.deleteMany({});
    console.log('✅ Cleared existing experiences');

    // Seed all experiences
    for (const experience of sampleExperiences) {
      await prisma.experience.create({
        data: experience
      });
    }

    console.log(`✅ Successfully seeded ${sampleExperiences.length} experiences`);
  } catch (error) {
    console.error('❌ Error seeding experiences:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 Experiences seed completed successfully!');
  })
  .catch((error) => {
    console.error('❌ Error running seed script:', error);
    process.exit(1);
  });