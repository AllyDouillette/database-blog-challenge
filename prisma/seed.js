const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUsers = await prisma.user.createMany({
        data: [
            {
                username: 'alicewonda',
                email: 'alice@wonda.org',
                password: 'hellou123'
            },
            { 
                username: 'alicewonka', 
                email: 'alice@wonkawonka.org',
                password: 'pwd'
            }
        ]
    });

    console.log(`${createdUsers.count} users created`, createdUsers);

    // Add your code here
    const createProfile = await prisma.profile.create({
        data: {
                firstName: 'alice',
                lastName: 'wondaaa',
                userId: 1,
                profileUrl: '',
                biography: ''
            }
    })

    console.log('created profile', createProfile)
    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })