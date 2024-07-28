import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [readme, setReadme] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`/api/users/${id}`);
				if (!response.ok) {
					throw new Error("User not found");
				}
				const result = await response.json();
				setUser(result.data);
			} catch (error) {
				setError(error.message);
			}
		};

		const fetchReadme = async () => {
			try {
				const response = await fetch(`/info/${id}/readme`);
				if (!response.ok) {
					throw new Error("README not found");
				}
				const result = await response.json();
				setReadme(result.readme);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchUser();
		fetchReadme();
	}, [id]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!user || !readme) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{user.username}'s Profile</h1>
			<p>User Type: {user.user_type}</p>
			{user.github_username && (
				<p>
					Github:{" "}
					<a
						href={`https://github.com/${user.github_username}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{user.github_username}
					</a>
				</p>
			)}
			<h2>README</h2>
			<div>{readme}</div>
		</div>
	);
};

export default Profile;
