import React, { useEffect, useState } from "react";
import "./project.css";

const Project = ({ userId }) => {
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProjects = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/projects`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Projects not found");
				}
				const result = await response.json();
				setProjects(result.projects);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchProjects();
	}, [userId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!projects.length) {
		return <div>no project</div>;
	}

	return (
		<div className="projects-container">
			<h1>Pinned Projects</h1>
			<div className="projects-row">
				{projects.map((project) => (
					<div key={project.id} className="project-card">
						<h3>{project.name}</h3>
						<p>{project.description}</p>
						<a href={project.url} target="_blank" rel="noopener noreferrer">
							Project URL
						</a>
						<a
							href={project.homepageUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Homepage
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Project;
