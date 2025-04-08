import { PrismaClient } from "@prisma/client";
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
  await prisma.rLRank.createMany({
    data: roles.map((role, i) => ({
      name: role,
      order: i
    }))
  })
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
