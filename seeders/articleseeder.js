const { faker } = require("@faker-js/faker");
const { Article } = require("../models/Model");
const slugify = require("slugify");

faker.locale = "es";

module.exports = async () => {
	const articles = [];

	for (let i = 0; i < 10; i++) {
		const title = faker.lorem.sentence(5);
		articles.push({
			title,
			content: faker.lorem.paragraph(4),
			slug: slugify(title, {
				replacement: "-",
				lower: true,
				strict: true,
				locale: "en",
				trim: true,
			}),
			image: faker.image.sports(undefined, undefined, true),
			date: faker.date.recent(),
			userId: faker.datatype.number({
				min: 1,
				max: 10,
			}),
		});
	}

	await Article.bulkCreate(articles);
	console.log("[Database] Se corrió el seeder de Articles.");
};
