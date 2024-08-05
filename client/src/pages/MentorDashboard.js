import React, { useState, useEffect } from "react";
import "./MentorDashboard.css";
import GradCard from "../components/GradsCards/GradCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MentorDashboard = () => {
	const [grads, setGrads] = useState([]);

	useEffect(() => {
		fetch("api/getAllGradUsers", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setGrads(data.data);
				} else {
					console.error("Failed to fetch graduate users");
				}
			})
			.catch((error) => console.error("Error fetching graduate users:", error));
	}, []);

	return (
		<div className="mentor-dashboard">
			<header>
				<h1>Welcome Mentor</h1>
				<div className="header-links">
					<a href="/settings">Settings</a>
				</div>
			</header>

			<section id="filter-search">
				<div className="search-container">
					<i className="fas fa-search search-icon"></i>
					<input
						type="text"
						id="search"
						placeholder="Search by name & skill..."
					/>
				</div>
				<input type="text" id="skill-filter" placeholder="Filter by skill..." />
				<div className="sort-select-container">
					<select id="sort-order">
						<option value="">Sort by activity score</option>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
			</section>

			<section id="grads-cards">
				{grads.map((grad) => (
					<GradCard grad={grad} key={grad.id} />
				))}
			</section>
		</div>
	);
};

export default MentorDashboard;
