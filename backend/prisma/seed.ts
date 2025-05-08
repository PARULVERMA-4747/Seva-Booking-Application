import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.seva.deleteMany();
  await prisma.user.deleteMany();

  // 🪔 Seed Sevas
  await prisma.seva.createMany({
    data: [
      {
        code: 'SEVA001',
        title: 'Free Food Distribution',
        tags: ['food', 'charity'],
        description: 'Free food for the community.',
        marketPrice: 100,
        discountedPrice: 50,
        start: new Date(),
        end: new Date(),
        amountRaised: 2000,
        targetAmount: 5000,
        media: 'https://example.com/media.jpg',
      },
      {
        code: 'SEVA002',
        title: 'Health Camp',
        tags: ['health', 'charity'],
        description: 'Free health check-ups.',
        marketPrice: 200,
        discountedPrice: 100,
        start: new Date(),
        end: new Date(),
        amountRaised: 1000,
        targetAmount: 3000,
        media: 'https://example.com/media2.jpg',
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210',
        verified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        contact: '9123456789',
        verified: false,
      },
    ],
  });

  console.log('Database seeded!');
};

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
