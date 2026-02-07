// Temporary Auth Repository for JWT and OAuth
import Prisma_Instances from '../../config/Prisma_Instances.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
// Repository backed by Prisma for temporary auth flows
export const findOrCreateUserByOAuth = async (profile) => {
    console.log('Finding or creating user by OAuth profile in DB:', profile);
    const provider = profile.oauthProvider;
    const providerAccountId = profile.oauthId;
    const email = profile.email?.toLowerCase() || null;
    // 1) Check if an account already exists for this provider/providerAccountId
    try {
        const account = await Prisma_Instances.account.findUnique({
            where: {
                provider_providerAccountId: {
                    provider,
                    providerAccountId,
                },
            },
            include: { user: true },
        });
        if (account?.user) {
            console.log('Found user via account:', account.user.id);
            return account.user;
        }
        // 2) If not, check if a user exists by email
        if (email) {
            const existingUser = await Prisma_Instances.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                // create account linked to existing user
                await Prisma_Instances.account.create({
                    data: {
                        provider,
                        providerAccountId,
                        user: { connect: { id: existingUser.id } },
                    },
                });
                return existingUser;
            }
        }
        // 3) Create new user and account
        // Generate a simple username from email or provider+id
        let username = email ? email.split('@')[0] : `${provider}_${providerAccountId.substring(0, 6)}`;
        username = username.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        // Ensure uniqueness by appending a suffix if needed
        let candidate = username;
        let attempt = 0;
        while (await Prisma_Instances.user.findUnique({ where: { username: candidate } })) {
            attempt += 1;
            candidate = `${username}_${attempt}`;
        }
        username = candidate;
        const newUser = await Prisma_Instances.user.create({
            data: {
                email,
                username,
                accounts: {
                    create: {
                        provider,
                        providerAccountId,
                    },
                },
            },
        });
        return newUser;
    }
    catch (err) {
        console.error('Error in findOrCreateUserByOAuth:', err);
        throw err;
    }
};
export const createUserWithPassword = async (email, hashedPassword) => {
    console.log('Creating user in DB with password:', email);
    const emailLower = email.toLowerCase();
    // generate username
    let username = (emailLower.split('@')[0] ?? '').replace(/[^a-z0-9_]/g, '_');
    // ensure uniqueness
    let candidate = username;
    let attempt = 0;
    while (await Prisma_Instances.user.findUnique({ where: { username: candidate } })) {
        attempt += 1;
        candidate = `${username}_${attempt}`;
    }
    username = candidate;
    try {
        const newUser = await Prisma_Instances.user.create({
            data: {
                email: emailLower,
                username,
                password: hashedPassword,
            },
        });
        return newUser;
    }
    catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
            throw new Error('User with this email or username already exists');
        }
        console.error(err);
        throw err;
    }
};
export const findUserByEmail = async (email) => {
    const emailLower = email.toLowerCase();
    console.log('Finding user by email in DB:', emailLower);
    const user = await Prisma_Instances.user.findUnique({ where: { email: emailLower } });
    return user || null;
};
export const findUserById = async (userId) => {
    console.log('Finding user by ID in DB:', userId);
    const user = await Prisma_Instances.user.findUnique({ where: { id: userId } });
    return user || null;
};
//# sourceMappingURL=tempAuth.repository.js.map