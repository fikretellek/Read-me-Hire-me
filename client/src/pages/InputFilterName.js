import React, { useState, useEffect } from "react";

const InputFilterName = ({ grads, onFilterChange }) => {
	const [inputData, setInputData] = useState("");

	useEffect(() => {
		const fetchFilteredData = async () => {
			try {
				const response = await fetch(`api/getGradUsersByName/${inputData}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				const data = await response.json();
				if (data.success) {
					const filteredData = data.data.map((grad) => ({
						...grad,
						github_username: grad.github_username.toLowerCase(),
					}));
					onFilterChange(filteredData);
				} else {
					console.error("Failed to fetch graduate users");
				}
			} catch (error) {
				console.error("Error fetching graduate users:", error);
			}
		};

		if (inputData) {
			fetchFilteredData();
		} else {
			onFilterChange(grads);
		}
	}, [inputData, grads, onFilterChange]);

	const handleChange = (event) => {
		setInputData(event.target.value);
	};

	return (
		<div className="search-container">
			<i className="fas fa-search search-icon"></i>
			<input
				type="text"
				id="search"
				placeholder="Search by name..."
				onChange={handleChange}
			/>
		</div>
	);
};

export default InputFilterName;
