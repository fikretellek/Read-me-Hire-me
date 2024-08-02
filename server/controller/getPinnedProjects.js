import db from "../db";

export default async function getPinnedProjects(req, res, next) {
	const user_id = req.params.id;

	try {
		const user_id_check = await db.query(
			`SELECT COUNT(*) as count FROM projects WHERE user_id = $1`,
			[user_id]
		);

		if (user_id_check.rows[0].count == 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const projects_data = await db.query(
			`SELECT * FROM projects WHERE user_id = $1`,
			[user_id]
		);

		res.status(200).json({ projects: projects_data.rows });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}
