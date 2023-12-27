const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "FST"},
                {name: "CMP"},
                {name: "EGN"},
                {name: "BIO"},
                {name: "MATH"},
                {name: "PHY"},
                {name: "CHM"},
            ]
        });
        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}
main();
