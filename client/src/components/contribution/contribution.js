import React, { useEffect, useState } from "react";
import "./contribution.css";

const Contribution = ({ userId }) => {
	const [activity, setActivity] = useState([]);
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
				setActivity(result.data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchContribution();
	}, [userId]);

	if (error) {
		return <div className="Activity-container">Error: {error}</div>;
	}

	if (!activity) {
		return <div className="Activity-container">Loading...</div>;
	}

	return (
		<div className="activity-table">
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
					{activity.map((act, index) => (
						<tr key={index}>
							<td>{act.production}</td>
							<td>{act.documentation}</td>
							<td>{act.collaboration}</td>
							<td>{act.total}</td>
							<td>{act.prDates}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Contribution;
