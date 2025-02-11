const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// seed a user
async function main() {
    await prisma.user.create({
        data: {
            email: 'test@test.com',
            name: 'Test User',
            passwordHash: 'password',
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });