import React, { useState, useEffect } from "react";

const InputFilter = ({ grads, onFilterChange }) => {
	const [inputData, setInputData] = useState("");

	useEffect(() => {
		const fetchFilteredData = async () => {
			try {
				const response = await fetch(`api/getAllGradUsers/${inputData}`, {
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
		<input
			type="text"
			id="skill-filter"
			placeholder="Filter by skill..."
			value={inputData}
			onChange={handleChange}
		/>
	);
};

export default InputFilter;
