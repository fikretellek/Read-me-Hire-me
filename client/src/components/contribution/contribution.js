import React, { useEffect, useState } from "react";
import "./contribution.css";

const Contribution = ({ userId }) => {
	const [activities, setActivity] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchContribution = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/activity`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Activity not found");
				}
				const result = await response.json();

				setActivity(result.activity);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchContribution();
	}, [userId]);
	console.log(activities);
	if (error) {
		return <div className="Activity-container">Error: {error}</div>;
	}

	if (Object.keys(activities).length === 0) {
		return <div className="Activity-container">There is no Activity</div>;
	}

	return (
		<div className="activity-table">
			<h1>Contributions</h1>
			<table>
				<thead>
					<tr>
						<th>Production</th>
						<th>Documentation</th>
						<th>Collaboration</th>
						<th>Total</th>
						<th>PR Dates</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{activities.production}</td>
						<td>{activities.documentation}</td>
						<td>{activities.collaboration}</td>
						<td>{activities.total}</td>
						<td>{activities.pr_dates}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Contribution;
