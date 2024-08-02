import db from "../db";

export default async function getSkills(req, res) {
	const userId = req.params.id;
	try {
		const user_id_check = await db.query(
			`SELECT COUNT(*) as count FROM profiles WHERE user_id = $1`,
			[userId]
		);
		if (parseInt(user_id_check.rows[0].count) === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		try {
			const skills_data = await db.query(
				`SELECT skills, avatar FROM profiles WHERE user_id = $1`,
				[userId]
			);
			res.status(200).json(skills_data.rows[0]);
		} catch (dbError) {
			res.status(500).json({ error: "Database connection error" });
		}
	} catch (error) {
		res.status(500).json({ error: "Database connection error" });
	}
}
