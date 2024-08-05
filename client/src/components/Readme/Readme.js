import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./readme.css";

const Readme = ({ userId }) => {
	const [readMeContent, setReadMeContent] = useState("");
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
				setReadMeContent(result.readme);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchReadme();
	}, [userId]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className="readme-container">
			<h1>README Content</h1>
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{readMeContent}</ReactMarkdown>
		</div>
	);
};

export default Readme;
