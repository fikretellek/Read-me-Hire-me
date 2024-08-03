import React, { useState, useEffect } from "react";
import "./MentorDashboard.css";
import GradCard from "../components/GradsCards/GradCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MentorDashboard = () => {
	const [grads, setGrads] = useState([]);
	const [isUpdating, setIsUpdating] = useState(false);


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

	const handleClick = async () => {
		setIsUpdating(true);
		try {
			const response = await fetch("api/updateAllGradData", {
				method: "POST", // or 'GET' depending on your API
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Data updated successfully:", data);
		} catch (error) {
			console.error("Error updating data:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="mentor-dashboard">
			<header>
				<h1>Welcome Mentor</h1>
				<div className="header-links">
					<a href="/settings">Settings</a>
					<a href="/logout">Logout</a>
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
				<button id="show-all-grads" onClick={handleClick} disabled={isUpdating}>
					{isUpdating ? "Updating..." : "Update Graduates Data"}
				</button>
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
