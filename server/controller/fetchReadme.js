import db from "../db";

export default async function fetchReadme(username) {
	const readmeLink = `https://api.github.com/repos/${username}/${username}/readme`;

	try {
		const response = await fetch(readmeLink);
		if (!response.ok) {
			throw new Error(`GitHub API responded with status ${response.status}`);
		}

		const data = await response.json();
		const readme = atob(data.content);


		try {
			const result = await db.query(
				`WITH user_data AS (

        try {
            const result = await db.query(
                `WITH user_data AS (

                    SELECT id AS user_id FROM users WHERE github_username = $1
                  )
                  INSERT INTO readmes (readme, user_id)
                  SELECT $2, user_id FROM user_data
                  RETURNING *;`,
				[username, readme]
			);
			return { result: result, message: "successfully added to db" };
		} catch (error) {
			return { error: error, message: "Cannot connect to db" };
		}
	} catch (error) {
		return { error: error, message: "Cannot connect to GitHub API" };
	}
}

// to test this function use this endpoint in api.js file

// router.get("/fetchReadme", async (_, res) => {
// 	const test = await fetchReadme("RbAvci")
// 	res.send(test)
// });
