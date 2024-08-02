import React, { useEffect, useState } from "react";
import "./avatar.css";

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
					<h2>{user.github_username}</h2>
				</a>
			)}
			<ul className="skill_list">
				<li>skill 1</li>
				<li>skill 2</li>
				<li>skill 3</li>
				<li>skill 4</li>
				<li>skill 5</li>
				<li>skill 6</li>
				<li>skill 7</li>
				<li>skill 8</li>
			</ul>
		</div>
	);
};

export default Avatar;
