import { Router } from "express";
import fetchPinnedProjects from "./controller/fetchPinnedProjects";
import logger from "./utils/logger";
import db from "./db";
import jwt from "jsonwebtoken";
import config from "./utils/config";
import { roleBasedAuth } from "./utils/middleware";
import fetchActivity from "./controller/fetchActivity";
import fetchReadme from "./controller/fetchReadme";
import infoRouter from "./routes/getInfoRouter";
import FetchSkills from "./controller/fetchSkills";
import hashPassword from "./middlewares/hashPassword";
const router = Router();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Read me, Hire me!" });
});

router.post("/sign-up", hashPassword, async (req, res) => {
	const { email, password, passwordHash, userType, userGithub } = req.body;

	// Check for valid email format
	if (!email || !emailRegex.test(email)) {
		return res.status(422).json({ message: "Invalid email format" });
	}

	if (!password) {
		return res.status(422).json({ message: "Password field is required" });
	}
	if (!userType) {
		return res.status(422).json({ message: "User_type field is required" });
	}
	if (userType == "graduate" && !userGithub) {
		return res
			.status(422)
			.json({ message: "Github_username field is required" });
	}

	try {
		const result = await db.query(
			"INSERT INTO users (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING id ",
			[email, passwordHash, userType]
		);

		const newUserID = result.rows[0].id;

		if (userType === "graduate" && userGithub) {
			await db.query("UPDATE users SET github_username = $2 WHERE id = $1", [
				newUserID,
				userGithub,
			]);

			await fetchReadme(userGithub);
			await fetchActivity(userGithub);

			await FetchSkills(userGithub);

			await fetchPinnedProjects(userGithub);
		}

		res.status(200).json({ success: true, data: { id: newUserID } });
	} catch (error) {
		console.error(error);
		if (error.code === "23505") {
			return res
				.status(409)
				.json({ success: false, error: "Email already exists" });
		}
		res.status(500).json({
			success: false,
			error: "Failed to create a new User into database",
		});
	}
});

router.get(
	"/users/:id",
	roleBasedAuth("graduate", "mentor", "recruiter"),
	async (req, res) => {
		const userId = req.params.id;
		try {
			const result = await db.query("SELECT * FROM users WHERE id = $1", [
				userId,
			]);

			if (result.rows.length === 0) {
				return res
					.status(404)
					.json({ success: false, message: "User not found" });
			}

			res.status(200).json({ success: true, data: result.rows[0] });
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to fetch User from the database",
			});
		}
	}
);

router.delete("/users/:id", async (req, res) => {
	const userId = req.params.id;

	try {
		const result = await db.query(
			"DELETE FROM users WHERE id = $1 RETURNING id",
			[userId]
		);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, data: { id: result.rows[0].id } });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed to delete User from the database",
		});
	}
});

router.post("/sign-in",hashPassword, async (req, res) => {
	const { email, password, passwordHash } = req.body;

	if (!email || !password) {
		return res
			.status(422)
			.json({ message: "Email and password are required" });
	}

	try {
		const result = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const user = result.rows[0];


		if (user.password_hash !== passwordHash) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, userType: user.user_type },
			config.jwtSecret,
			{ expiresIn: "1h" }
		);

		user.token = token;
		res
			.status(200)
			.json({ success: true, data: { id: user.id, user: { ...user, token } } });
	} catch (error) {
		res.status(500).json({ success: false, error: "Failed to log in" });
	}
});

router.put(
	"/users/:id/password", hashPassword,
	roleBasedAuth("graduate", "mentor", "recruiter"),
	async (req, res) => {
		const userId = req.params.id;
		const { password, passwordHash } = req.body;

		if (!password) {
			return res
				.status(422)
				.json({ message: "Password_hash field is required" });
		}

		try {
			const result = await db.query(
				"UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id",
				[passwordHash, userId]
			);

			if (result.rows.length === 0) {
				return res
					.status(404)
					.json({ success: false, message: "User not found" });
			}

			res.status(200).json({ success: true, data: { id: result.rows[0].id } });
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to update User's password in the database",
			});
		}
	}
);


router.get(
	"/getAllGradUsers",
	roleBasedAuth ("mentor", "recruiter"),
	async (_, res) => {
		try {
			const result = await db.query(
				"SELECT id, email, github_username FROM users WHERE user_type = 'graduate'"
			);
			res.status(200).json({ success: true, data: result.rows });
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to fetch User from the database",
			});
		}
	}
);


router.use("/info", infoRouter);
export default router;
