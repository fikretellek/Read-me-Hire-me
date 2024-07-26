import db from "../db";

export default async function fetchPinnedProjects(username) {
	const gitHubGraphqlLink = "https://api.github.com/graphql";
	const headers = {
		Authorization: `Bearer ${process.env.GITHUB_AUTH_KEY}`,
		"Content-Type": "application/json",
	};
	const body = JSON.stringify({
		query: `{
			user(login: ${username}) {
			  pinnedItems(first: 6, types: REPOSITORY) {
				nodes {
				  ... on RepositoryInfo {
					name
					description
					url
					homepageUrl
					
				  }
				}
			  }
			}
		  }`,
	});

	try {
		const response = await fetch(gitHubGraphqlLink, {
			method: "POST",
			headers: headers,
			body: body,
		});

		if (!response.ok) {
			throw new Error(`GitHub API responded with status ${response.status}`);
		}

		const projects = await response.json();

		console.log(projects)

		

		try {
			const result = await db.query(
				`WITH user_data AS (
                    SELECT id AS user_id FROM users WHERE github_username = $1
                )
                INSERT INTO activities (production, documentation, collaboration, total, pr_dates, user_id)
                VALUES ($2, $3, $4, $5, $6, (SELECT user_id FROM user_data));`,
				[
					username,
					activity.production,
					activity.documentation,
					activity.collaboration,
					activity.total,
					activity.prDates.toString(),
				]
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

// router.get("/fetchPinnedProjects", async (_, res) => {
// 	const test = await fetchPinnedProjects("RbAvci")
// 	res.send(test)
// });
