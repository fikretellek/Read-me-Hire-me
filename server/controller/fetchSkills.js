import db from "../db";

export default async function FetchSkills(username) {
	const skillsLink = `https://api.github.com/users/${username}`;
	try {
		const fetchResponse = await fetch(skillsLink);
		if (!fetchResponse.ok) {
			throw new Error(
				`GitHub API responded with status ${fetchResponse.status}`
			);
		}
		const responseData = await fetchResponse.json();
		const skills = responseData.bio;
		const avatar = responseData.avatar_url;

		try {
			const result = await db.query(
				`WITH user_data AS (
                SELECT id AS user_id FROM users WHERE github_username = $1
            )
            INSERT INTO profiles (skills, avatar, user_id)
            SELECT $2, $3, user_id FROM user_data
            RETURNING *;`,
				[username, skills, avatar]
			);
			return { result: result.rows, message: "Successfully added to db" };
		} catch (dbError) {
			return { error: dbError, message: "Cannot connect to db" };
		}
	} catch (fetchError) {
		return { error: fetchError, message: "Cannot fetch data from GitHub" };
	}
}
