// scripts/seed-admin-only.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin user seed...');
    
    // Clear existing admin users
    await prisma.user.deleteMany();
    console.log('🧹 Cleared existing users');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    });
    
    console.log('✅ Admin user created successfully:', admin);
    console.log('\n🔐 You can log in with:');
    console.log('Email: admin@example.com');
    console.log('Password: Admin123!');
    console.log('\n⚠️ IMPORTANT: Change this password after first login!');
    console.log('\n🎉 Admin seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });