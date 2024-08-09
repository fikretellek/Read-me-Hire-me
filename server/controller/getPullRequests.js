import db from "../db";

export default async function getPullRequests(req, res) {
	const userId = req.params.id;
	console.log(userId)
	try {
		const userCheckQuery = `
        SELECT 
            COUNT(*) AS total, 
            COUNT(CASE WHEN state = 'MERGED' THEN 1 END) AS merged_count, 
            COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 week' THEN 1 END) AS created_last_week,
			ARRAY_AGG(created_at) AS pr_dates_array
        FROM pull_requests
        WHERE user_id = $1;
        `;
		const { rows } = await db.query(userCheckQuery, [userId]);

		if (rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(500).json({ error: "Database connection error" });
	}
}
