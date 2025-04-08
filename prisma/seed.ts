import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();

async function main() {
  const roles = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Champion",
    "Grandchampion",
    "Supersoniclegend"
  ];
  await Promise.all(
    roles.map((role, i) => {
      return prisma.rLRank.upsert({
        where: { name: role },
        update: {},
        create: {
          name: role,
          order: i
        }
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });