import React, { useState, useEffect, useCallback } from "react";
import "./MentorDashboard.css";
import GradCard from "../components/GradsCards/GradCard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import InputFilter from "./InputFilter";
import InputFilterName from "./InputFilterName";

const MentorDashboard = () => {
	const [grads, setGrads] = useState([]);
	const [filteredGrads, setFilteredGrads] = useState([]);

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
					setFilteredGrads(data.data);
				} else {
					console.error("Failed to fetch graduate users");
				}
			})
			.catch((error) => console.error("Error fetching graduate users:", error));
	}, []);

	const handleFilterChange = useCallback((filteredGrads) => {
		const uniqueGrads = Array.from(
			new Map(filteredGrads.map((grad) => [grad.id, grad])).values()
		);
		setFilteredGrads(uniqueGrads);
	}, []);

	return (
		<div className="mentor-dashboard">
			<header>
				<h1>Welcome Mentor</h1>
			</header>
			<section id="filter-search">
				<InputFilter grads={grads} onFilterChange={handleFilterChange} />

				<InputFilterName grads={grads} onFilterChange={handleFilterChange} />
				<div className="sort-select-container">
					<select id="sort-order">
						<option value="">Sort by activity score</option>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>

			</section>
			<section id="grads-cards">
				{filteredGrads.map((grad) => (
					<GradCard grad={grad} key={grad.id} />
				))}
			</section>
		</div>
	);
};

export default MentorDashboard;
