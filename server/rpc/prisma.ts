import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

/** Number of sample records to create on first load */
const generateCount = 15;
/** Create sample records to show on first load */
async function populateNewDatabase() {
  const count = await prisma.todo.count();
  if (count !== 0) {
    return;
  }
  const { faker } = await import("@faker-js/faker");
  for (let i = 0; i < generateCount; i++) {
    const data = {
      name: faker.lorem.sentence({ min: 3, max: 5 }),
      description: faker.lorem.sentences({ min: 1, max: 2 }),
    };
    await prisma.todo.create({ data });
  }
}

void populateNewDatabase();
