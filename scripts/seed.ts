const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "CS" },
        { name: "Aviation" },
        { name: "Music" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Web Development" },
      ],
    });

    console.log("[] Success... []");
  } catch (error) {
    console.log("Error seeding", error);
  } finally {
    await db.$disconnect();
  }
}

main();
