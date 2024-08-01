import React, { useEffect, useState } from "react";
import "./avatar.css";
import Skill from "./Skill";

const Avatar = ({ userId, user }) => {
	const [avatar, setAvatar] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAvatar = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`/api/info/${userId}/skills`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Avatar not found");
				}
				const result = await response.json();
				setAvatar(result.avatar);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchAvatar();
	}, [userId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!avatar) {
		return <div>No Avatar Found</div>;
	}

	return (
		<div className="avatar_container">
			<img src={avatar} alt="Avatar" className="avatar-image" />
			{user.github_username && (
				<a
					className="github-link"
					href={`https://github.com/${user.github_username}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h1>{user.github_username}</h1>
				</a>
			)}
			<Skill userId={userId} user={user} />
		</div>
	);
};

export default Avatar;
