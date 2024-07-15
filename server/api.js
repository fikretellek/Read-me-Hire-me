import { Router } from "express";

import logger from "./utils/logger";
import db from "./db";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});


router.post("/users", async (req, res) => {
	const { username, passwordHash, userType } = req.body;

	if (!username) {
		return res.status(422).json({ message: "Username field is required" });
	}
	if (!passwordHash) {
		return res.status(422).json({ message: "Password_hash field is required"});
	}
	if (!userType) {
		return res.status(422).json({ message: "User_type field is required" });
	}

	try {
		const result = await db.query(
			"INSERT INTO users (username, password_hash, user_type) VALUES ($1, $2, $3) RETURNING id",
			[username, passwordHash, userType]
		);

		const newUserID = result.rows[0].id;
		res.status(200).json({ success: true, data: { id: newUserID } });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Failed to create a new User into database" });
	}
});



export default router;
