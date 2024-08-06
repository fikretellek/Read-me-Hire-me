import db from "../db";
import moment from 'moment';

export default async function fetchPullRequests(username) {
	const gitHubGraphqlLink = "https://api.github.com/graphql";
	const headers = {
		Authorization: `Bearer ${process.env.GITHUB_AUTH_KEY}`,
		"Content-Type": "application/json",
	};
    

const lastNinetyDays = moment().subtract(90, 'days').format('YYYY-MM-DD');

	const body = JSON.stringify({
		query: `
        {
            search(
              query: "type:pr author:${username} created:>${lastNinetyDays}"
              type: ISSUE
              first: 100
            ) {
              edges {
                node {
                  ... on PullRequest {
                    createdAt
                    state
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
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

		const queryData = await response.json();

		const availablePullRequestEdges = queryData.data.search.edges.filter(item => item != null)

        const pullRequests = availablePullRequestEdges.map(item => item.node)

		try {
			const fetchTime = Math.floor(Date.now() / 1000);
			for (const pr of pullRequests) {
				await db.query(
					`WITH user_data AS (
					  SELECT id AS user_id FROM users WHERE github_username = $1
					)
					INSERT INTO pull_requests (created_at, state, user_id, fetch_time)
					VALUES ($2, $3, (SELECT user_id FROM user_data), $4);`,
					[
						username,
						pr.createdAt,
						pr.state,
						fetchTime,
					]
				);
			}

			return { message: "successfully added to db" };
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
