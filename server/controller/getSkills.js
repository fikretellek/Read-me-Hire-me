import db from "../db";
export default async function getSkills(req, res) {
	const user_id = req.params.id;
	try {
		const user_id_check = await db.query(
			`SELECT COUNT(*) as count FROM profiles where user_id = $1`,
			[user_id]
		);
		if (!user_id_check.row[0].count == 0) {
			return res.status(404).json({ error: "User not found" });
		}
		try {
			const skills_data = db.query(
				`SELECT skills FROM profiles WHERE user_id = $1`,
				[user_id]
			);
			res.status(200).json(readme_data.rows[0]);
		} catch (error) {
			res.status(500).json({ error: "Database connection error" });
		}
	} catch (error) {
		res.status(500).json({ error: "Database connection error" });
	}
}
