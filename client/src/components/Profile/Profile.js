// Profile.js
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import Readme from "../Readme/Readme";

const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/users/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("User not found");
				}
				const result = await response.json();
				setUser(result.data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchUser();
	}, [id]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="profile-container">
			<header>
				<h1>Welcome {user.username}</h1>
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
			</header>
			<Readme userId={id} />
		</div>
	);
};

export default Profile;
