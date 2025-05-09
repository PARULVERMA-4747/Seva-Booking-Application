import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.seva.deleteMany();

  await prisma.seva.createMany({
    data: [
      { code: 'SEVA001', title: 'Free Food', tags: ['food'], description: 'Provide meals to the needy', marketPrice: 100, discountedPrice: 50, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 5000, media: 'image1.jpg' },
      { code: 'SEVA002', title: 'Health Checkup', tags: ['health'], description: 'Free health checkup camp', marketPrice: 200, discountedPrice: 100, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 8000, media: 'image2.jpg' },
      { code: 'SEVA003', title: 'Books for Kids', tags: ['education'], description: 'Donate books to underprivileged children', marketPrice: 150, discountedPrice: 75, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 6000, media: 'image3.jpg' },
      { code: 'SEVA004', title: 'Tree Plantation', tags: ['environment'], description: 'Plant trees across the city', marketPrice: 120, discountedPrice: 60, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 7000, media: 'image4.jpg' },
      { code: 'SEVA005', title: 'Water Drive', tags: ['social'], description: 'Distribute clean drinking water', marketPrice: 80, discountedPrice: 40, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 4000, media: 'image5.jpg' },
      { code: 'SEVA006', title: 'Clothes Donation', tags: ['clothing'], description: 'Donate warm clothes', marketPrice: 130, discountedPrice: 65, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 5500, media: 'image6.jpg' },
      { code: 'SEVA007', title: 'Eye Camp', tags: ['health'], description: 'Free eye testing and glasses', marketPrice: 250, discountedPrice: 125, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 9000, media: 'image7.jpg' },
      { code: 'SEVA008', title: 'Stationery Drive', tags: ['education'], description: 'Provide stationery to kids', marketPrice: 90, discountedPrice: 45, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 3000, media: 'image8.jpg' },
      { code: 'SEVA009', title: 'Blanket Distribution', tags: ['relief'], description: 'Distribute blankets in winter', marketPrice: 170, discountedPrice: 85, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 5000, media: 'image9.jpg' },
      { code: 'SEVA010', title: 'Blood Donation Camp', tags: ['health'], description: 'Organize blood donation event', marketPrice: 0, discountedPrice: 0, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 0, media: 'image10.jpg' },
      { code: 'SEVA011', title: 'Skill Training', tags: ['education'], description: 'Skill development for youth', marketPrice: 300, discountedPrice: 150, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 10000, media: 'image11.jpg' },
      { code: 'SEVA012', title: 'Sanitary Kits', tags: ['health'], description: 'Distribute sanitary kits', marketPrice: 110, discountedPrice: 55, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 4500, media: 'image12.jpg' },
      { code: 'SEVA013', title: 'COVID Relief', tags: ['health'], description: 'Provide masks and sanitizers', marketPrice: 95, discountedPrice: 47, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 6500, media: 'image13.jpg' },
      { code: 'SEVA014', title: 'Girls Education', tags: ['education'], description: 'Sponsor girl child education', marketPrice: 400, discountedPrice: 200, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 12000, media: 'image14.jpg' },
      { code: 'SEVA015', title: 'Women Empowerment', tags: ['social'], description: 'Support small businesses for women', marketPrice: 350, discountedPrice: 175, start: new Date(), end: new Date(), amountRaised: 0, targetAmount: 11000, media: 'image15.jpg' }
    ]
  });

  await prisma.user.createMany({
    data: [
      { name: 'Alice', contact: '9876543210', email: 'alice@example.com' },
      { name: 'Bob', contact: '8765432109', email: 'bob@example.com' },
      { name: 'Charlie', contact: '7654321098', email: 'charlie@example.com' },
      { name: 'Diana', contact: '6543210987', email: 'diana@example.com' },
      { name: 'Ethan', contact: '5432109876', email: 'ethan@example.com' },
      { name: 'Fiona', contact: '4321098765', email: 'fiona@example.com' },
    ]
  });

  console.log('Sevas and Users seeded');
};

seed().catch(err => console.error('Seed error:', err)).finally(() => prisma.$disconnect());
