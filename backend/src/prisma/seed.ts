import { PrismaClient, Role } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample contact messages
    const contact1 = await prisma.contact.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'General Inquiry',
            message: 'Hello, I have a question about your services. Could you please provide more information?'
        }
    });

    const contact2 = await prisma.contact.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            subject: 'Bug Report',
            message: 'I found a bug in the application. When I try to login, the page does not respond properly.',
            userId: admin.id
        }
    });

    console.log('✅ Created sample contact messages:', contact1.id, contact2.id);
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
