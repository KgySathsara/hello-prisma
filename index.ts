import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
      })
      console.log(post)

  const user = await prisma.user.create({
    data: {
      name: "KGY",
      email: "Kgy@gmail.com",
      posts: {
        create: { title: "I am KGY" },
      },
      profile: {
        create: { bio: "Software Engineer" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });

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
