const { faker } = require("@faker-js/faker");
const { User } = require("../models/Model");

faker.locale = "es";

module.exports = async () => {
	const users = [];

	for (let i = 0; i < 10; i++) {
		users.push({
			firstname: faker.name.firstName(),
			lastname: faker.name.lastName(),
			email: faker.internet.email(),
			profileimg: faker.image.avatar(),
		});
	}

	await User.bulkCreate(users);
	console.log("[Database] Se corrió el seeder de Users.");
};
