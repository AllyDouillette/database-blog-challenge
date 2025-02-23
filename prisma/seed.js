const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { LoremIpsum } = require('lorem-ipsum')

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

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
    const createProfiles = await prisma.profile.createMany({
        data: [
            {
                firstName: 'alice',
                lastName: 'wondaaa',
                userId: 1,
                profileUrl: '',
                biography: ''
            },
            {
                firstName: 'alice',
                lastName: 'Two',
                userId: 2,
                profileUrl: '',
                biography: ''
            }
        ]
    })
    
    console.log('created profiles', createProfiles)
    
    const posts = []
    for (let i = 0; i < 10; i++) {
        for (let j = 1; j < 3; j++) {
            posts.push({
                userId: j,
                title: i+'Ljsahdjahsdj',
                content: 'ajsjhajdasd',
                pictureUrl: '',
                published: !!(Math.random() > 0.5),
                upvotes: parseInt(Math.random()*100)
            })
        }
    }

    const createPosts = await prisma.post.createMany({
        data: posts
    })

    console.log('created posts', createPosts)

    const comments = []

    for (let i = 0; i < 50; i++) {
        comments.push({
            userId: Math.random() > 0.5 ? 1 : 2,
            postId: parseInt(Math.random() * 9)+1,
            content: lorem.generateSentences(1),
            upvotes: parseInt(Math.random() * 4)
        })
    }

    const createComments = await prisma.comment.createMany({
        data: comments
    })

    console.log('created comments', createComments)
    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })