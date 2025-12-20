// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const practices = [
    { name: "Water Harvesting", description: "Collecting rainwater for irrigation", points: 20 },
    { name: "Organic Fertilizer", description: "Using compost or manure", points: 15 },
    { name: "Solar Irrigation", description: "Solar-powered pumps", points: 25 },
    { name: "Agroforestry", description: "Integrating trees with crops", points: 18 },
    { name: "Cover Cropping", description: "Plants to protect soil", points: 12 },
  ];

  for (const p of practices) {
    await prisma.sustainablePractice.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  console.log('✅ Sustainable practices seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });