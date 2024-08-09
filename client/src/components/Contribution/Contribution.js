import React, { useEffect, useState } from "react";
import { parseISO, differenceInDays } from "date-fns";
import "./contribution.css";

const Contribution = ({ userId }) => {
	const [activities, setActivity] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchContribution = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/pullRequests`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Activity not found");
				}
				const result = await response.json();
				setActivity(result);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchContribution();
	}, [userId]);
	if (error) {
		return <div className="Activity-container">Error: {error}</div>;
	}
  
	const radius = 80;
	const circumference = 2 * Math.PI * radius;
	const offset =
		circumference -
		((activities.total - activities.merged_count) / 100) * circumference;

	const now = new Date();
	const intervals = {
		last30Days: 0,
		between30and60Days: 0,
		between60and90Days: 0,
	};
	if(activities.pr_dates_array){
		activities.pr_dates_array.forEach((date) => {
		const daysAgo = differenceInDays(now, parseISO(date));

		if (daysAgo <= 30) {
			intervals.last30Days += 1;
		} else if (daysAgo > 30 && daysAgo <= 60) {
			intervals.between30and60Days += 1;
		} else if (daysAgo > 60 && daysAgo <= 90) {
			intervals.between60and90Days += 1;
		}
	});
	}
	

	const maxValue = Math.max(...Object.values(intervals));

	console.log(intervals);

	return (
		<div className="activity-table">
			<h1>Contributions</h1>
			<div className="contributions">
				<div>
					<p>Total PR's (90 days):</p>
					<svg width="200" height="200" viewBox="0 0 200 200">
						{/* outer circle */}
						<circle
							cx="100"
							cy="100"
							r={1}
							stroke="#357abd"
							strokeWidth="170"
							fill="none"
						/>
						<text
							x="100"
							y="100"
							textAnchor="middle"
							fontSize="30"
							dominantBaseline="middle"
							fill="white"
							fontFamily="Arial"
						>
							{activities.total}x
						</text>
					</svg>
				</div>
				<div>
					<p>Merged PR's rate:</p>
					<svg width="200" height="200" viewBox="0 0 200 200">
						{/* outer circle */}
						<circle
							cx="100"
							cy="100"
							r={radius}
							stroke="lightgray"
							strokeWidth="15"
							fill="none"
						/>

						{/* merged percentage circle */}
						<circle
							cx="100"
							cy="100"
							r={radius}
							stroke="#35bd57"
							strokeWidth="15"
							fill="none"
							strokeDasharray={circumference}
							strokeDashoffset={circumference - offset}
							transform="rotate(-90 100 100)"
						/>
						<text
							x="100"
							y="100"
							textAnchor="middle"
							fontSize="30"
							dominantBaseline="middle"
							fill="black"
							fontFamily="Arial"
						>
							%{Math.floor((activities.merged_count / activities.total) * 100)}
						</text>
					</svg>
				</div>
				<div className="chart">
					<div className="months-container">
						<p id="left-legend" className="legend-type">
							pr counts
						</p>
						<div
							id="third-m"
							className="month"
							style={{
								height: `${(intervals.between60and90Days / maxValue) * 100}%`,
							}}
						>
							<p className="rate">x{intervals.between60and90Days}</p>
						</div>
						<div
							id="second-m"
							className="month"
							style={{
								height: `${
									(intervals.between30and60Days / maxValue) * 100 + 1
								}%`,
							}}
						>
							<p className="rate">x{intervals.between30and60Days}</p>
						</div>
						<div
							id="first-m"
							className="month"
							style={{ height: `${(intervals.last30Days / maxValue) * 100}%` }}
						>
							<p className="rate">x{intervals.last30Days}</p>
						</div>
						<p id="bottom-legend" className="legend-type">
							months
						</p>
					</div>
					<div className="legend">
						<p>month before</p>
						<p>last month</p>
						<p>this month</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contribution;
