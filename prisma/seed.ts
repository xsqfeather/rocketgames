import bcrypt from "bcrypt";
import { bootPrismaClient, prismaClient } from "shared/clients";

const configPath =
    process.env.NODE_ENV === "production"
        ? process.cwd() + ".env.docker"
        : process.cwd() + ".env";

const adminSeed = {
    username: "root",
    password: "root-2024-best",
};

await bootPrismaClient(configPath);

const admin = await prismaClient.admin.findUnique({
    where: {
        username: adminSeed.username,
    },
});

if (!admin) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(adminSeed.password, salt);

    await prismaClient.admin.create({
        data: {
            username: adminSeed.username,
            password: hash,
        },
    });
}

process.exit(0);
