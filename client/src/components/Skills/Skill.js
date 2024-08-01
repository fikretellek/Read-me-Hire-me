import React, { useEffect, useState } from "react";
import "./avatar.css";

const Skill = ({ userId, user }) => {
	const [skills, setSkills] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSkills = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/skills`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Skills not found");
				}
				const result = await response.json();
				setSkills(
					result.skills
						.split(/\s+/)
						.map((skill) => skill.trim().replace(/[()|,]/g, ""))
						.filter((skill) => skill)
				);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchSkills();
	}, [userId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!skills.length) {
		return <div>No Skills Found</div>;
	}

	return (
		<ul className="skill_list">
			{skills.map((skill, index) => (
				<li key={index} className="skill_item">
					{skill}
				</li>
			))}
		</ul>
	);
};

export default Skill;
