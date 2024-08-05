import db from "../db";

export default async function getSkills(req, res) {
	const userId = req.params.id;
	try {
		const userCheckQuery = `
            SELECT skills, avatar 
            FROM profiles 
            WHERE user_id = $1
			ORDER BY fetch_time DESC
        `;
		const { rows } = await db.query(userCheckQuery, [userId]);

		if (rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const { skills, avatar } = rows[0];
		res.status(200).json({ skills, avatar });
	} catch (error) {
		res.status(500).json({ error: "Database connection error" });
	}
}
