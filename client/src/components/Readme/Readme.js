// Readme.js
import React, { useEffect, useState } from "react";

const Readme = ({ userId }) => {
	const [readme, setReadme] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchReadme = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/readme`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("README not found");
				}
				const result = await response.json();
				setReadme(result.readme);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchReadme();
	}, [userId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!readme) {
		return <div>Loading...</div>;
	}

	const extractAndFilterLinks = (content) => {
		const cvPattern = /\[cv\]\((https?:\/\/[^\s)]+)\)/i;
		const linkedinPattern = /\[linkedin\]\((https?:\/\/[^\s)]+)\)/i;
		const personalStatementPattern =
			/\[personal-statement\]\((https?:\/\/[^\s)]+)\)/i;

		const cvMatch = content.match(cvPattern);
		const linkedinMatch = content.match(linkedinPattern);
		const personalStatementMatch = content.match(personalStatementPattern);

		const allowedLinks = {
			cv: cvMatch ? { text: "cv", url: cvMatch[1] } : null,
			linkedin: linkedinMatch
				? { text: "LinkedIn", url: linkedinMatch[1] }
				: null,
			personalStatement: personalStatementMatch
				? { text: "personal-statement", url: personalStatementMatch[1] }
				: null,
		};

		let cleanedContent = content
			.replace(cvPattern, "")
			.replace(linkedinPattern, "")
			.replace(personalStatementPattern, "")
			.replace(/https?:\/\/[^\s)]+/gi, "")
			.replace(/\[.*?\]\((https?:\/\/[^\s)]+)\)/gi, "")
			.replace(/(?:^|\s)[-•]\s.*(?=\n|\r|$)/g, "")
			.replace(/\s\s+/g, " ")
			.trim();

		return { allowedLinks, cleanedContent };
	};

	const { allowedLinks, cleanedContent } = extractAndFilterLinks(readme);

	return (
		<div className="readme-container">
			<h2>README</h2>
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
