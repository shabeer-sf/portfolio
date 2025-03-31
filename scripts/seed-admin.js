// scripts/seed-admin.js
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting admin user seed...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com',
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists, skipping creation');
      return;
    }

    // Create admin user with hashed password
    const hashedPassword = await hash('Admin123!', 12);
    
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully:', {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role
    });
    
    console.log('\n🔐 You can log in with:');
    console.log('Email: admin@example.com');
    console.log('Password: Admin123!');
    console.log('\n⚠️ IMPORTANT: Change this password after first login!\n');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 Admin seed completed successfully!');
  })
  .catch((error) => {
    console.error('❌ Error running seed script:', error);
    process.exit(1);
  });