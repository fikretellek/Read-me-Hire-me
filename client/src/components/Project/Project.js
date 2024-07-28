// Readme.js
import React, { useEffect, useState } from "react";

const Readme = ({ userId }) => {
	const [project, setProject] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProject = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/projects`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("projects not found");
				}
				const result = await response.json();
				setProject(result.projects);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchProject();
	}, [userId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!project) {
		return <div>Loading...</div>;
	}

	return (
		<div className="project-container">
			<h2>Pinned Projects</h2>
			<p>{cleanedContent}</p>
			<nav className="navig">
				{allowedLinks.cv && (
					<a
						href={allowedLinks.cv.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{allowedLinks.cv.text}
					</a>
				)}
				{allowedLinks.linkedin && (
					<a
						href={allowedLinks.linkedin.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{allowedLinks.linkedin.text}
					</a>
				)}
				{allowedLinks.personalStatement && (
					<a
						href={allowedLinks.personalStatement.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{allowedLinks.personalStatement.text}
					</a>
				)}
			</nav>
		</div>
	);
};

export default Readme;
