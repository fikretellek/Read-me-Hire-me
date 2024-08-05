import db from "../db";

export default async function fetchActivity(username) {
	const eventsLink = `https://api.github.com/users/${username}/events`;

	try {
		const response = await fetch(eventsLink);
		if (!response.ok) {
			throw new Error(`GitHub API responded with status ${response.status}`);
		}

		const data = await response.json();

		/* these are github api events
		CommitCommentEvent
		CreateEvent
		DeleteEvent
		ForkEvent
		GollumEvent
		IssueCommentEvent
		IssuesEvent
		MemberEvent
		PublicEvent
		PullRequestEvent
		PullRequestReviewEvent
		PullRequestReviewCommentEvent
		PullRequestReviewThreadEvent
		PushEvent
		ReleaseEvent
		SponsorshipEvent
		WatchEvent

        production
        --CommitCommentEvent
        --ForkEvent
        --PullRequestEvent
        --PushEvent
        documentation
        --CreateEvent
        --DeleteEvent
        --IssuesEvent
        collaboration
        --IssueCommentEvent
        --MemberEvent
        --PullRequestReviewEvent
		--PullRequestReviewCommentEvent

        undecided
        --GollumEvent
        --PublicEvent
        --PullRequestReviewThreadEvent
        --ReleaseEvent
        --SponsorshipEvent
		--WatchEvent       
        */

		let activity = {
			production: 0,
			documentation: 0,
			collaboration: 0,
			total: 0,
			prDates: [],
		};

		data.forEach((event) => {
			switch (event.type) {
				case "PullRequestEvent":
					if (event.payload.action == "opened") {
						activity.prDates.push(event.payload.pull_request.created_at);
					}
				case "CommitCommentEvent":
				case "ForkEvent":
				case "PushEvent":
					activity.production++;
					break;
				case "CreateEvent":
				case "DeleteEvent":
				case "IssuesEvent":
					activity.documentation++;
					break;
				case "IssueCommentEvent":
				case "MemberEvent":
				case "PullRequestReviewEvent":
				case "PullRequestReviewCommentEvent":
					activity.collaboration++;
					break;

				default:
					break;
			}
			activity.total++;
		});

		try {
			const result = await db.query(
				`WITH user_data AS (
                    SELECT id AS user_id FROM users WHERE github_username = $1
                )
                INSERT INTO activities (production, documentation, collaboration, total, pr_dates, user_id, fetch_time)
                VALUES ($2, $3, $4, $5, $6, (SELECT user_id FROM user_data), EXTRACT(EPOCH FROM CURRENT_TIMESTAMP));`,
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

// router.get("/fetchActivity", async (_, res) => {
// 	const test = await fetchActivity("RbAvci")
// 	res.send(test)
// });
