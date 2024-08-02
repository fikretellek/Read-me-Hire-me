import db from "../db";

export default async function getReadme(req, res, next) {
	const user_id = req.params.id;

	try {
		const user_id_check = await db.query(
			`SELECT COUNT(*) as count FROM readmes WHERE user_id = $1`,
			[user_id]
		);

		if (user_id_check.rows[0].count == 0) {
			return res.status(404).json({ error: "User not found" });
		}

		try {
			const readme_data = await db.query(
				`SELECT readme FROM readmes WHERE user_id = $1`,
				[user_id]
			);

			res.status(200).json(readme_data.rows[0]);

		} catch (error) {
            res.status(500).json({ error: 'Database connection error' });
        }
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}
