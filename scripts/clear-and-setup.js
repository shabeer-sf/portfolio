// scripts/clear-and-setup.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearAndSetup() {
  try {
    console.log('🧹 Clearing all data...');
    
    // Clear all tables in proper order (respecting foreign key constraints)
    await prisma.projectOnTag.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.project.deleteMany();
    await prisma.projectTag.deleteMany();
    await prisma.projectCategory.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.service.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.socialLink.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.certification.deleteMany();
    await prisma.education.deleteMany();
    await prisma.analytics.deleteMany();
    await prisma.newsletter.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ All data cleared');
    
    console.log('📂 Creating default project categories...');
    
    // Create default project categories
    const categories = [
      {
        name: 'Web Development',
        slug: 'web',
        description: 'Modern web applications and websites',
        color: '#3B82F6', // Blue
        icon: 'Globe',
        order: 1
      },
      {
        name: 'Mobile Apps',
        slug: 'mobile',
        description: 'iOS and Android mobile applications',
        color: '#8B5CF6', // Purple
        icon: 'Smartphone',
        order: 2
      },
      {
        name: 'Full Stack',
        slug: 'fullstack',
        description: 'Complete end-to-end applications',
        color: '#10B981', // Green
        icon: 'Layers',
        order: 3
      },
      {
        name: 'Backend & APIs',
        slug: 'backend',
        description: 'Server-side applications and APIs',
        color: '#F59E0B', // Amber
        icon: 'Server',
        order: 4
      },
      {
        name: 'DevOps & Tools',
        slug: 'devops',
        description: 'Development tools and infrastructure',
        color: '#EF4444', // Red
        icon: 'Settings',
        order: 5
      },
      {
        name: 'Other Projects',
        slug: 'other',
        description: 'Miscellaneous projects and experiments',
        color: '#6B7280', // Gray
        icon: 'Box',
        order: 6
      }
    ];
    
    for (const category of categories) {
      await prisma.projectCategory.create({
        data: category
      });
      console.log(`✅ Created category: ${category.name}`);
    }
    
    console.log('🎉 Setup completed successfully!');
    console.log('ℹ️  You can now create projects and assign them to these categories.');
    
  } catch (error) {
    console.error('❌ Error during setup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
clearAndSetup()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });