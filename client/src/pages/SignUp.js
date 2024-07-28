import React, { useState } from "react";
import { hashPassword } from "./Util.js";
import "./FormStyles.css";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("graduate");
	const [message, setMessage] = useState("");
	const [isGraduate, setIsGraduate] = useState(true);
	const [userGithub, setUserGithub] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();

		const passwordHash = await hashPassword(password);

		const response = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				passwordHash,
				userType,
				userGithub,
			}),
		});

		const result = await response.json();

		if (response.ok) {
			setMessage(`User created with ID: ${result.data.id}`);
		} else if (response.status === 409) {
			setMessage("Error: Username already exists");
		} else {
			setMessage(`Error: ${result.message || result.error}`);
		}
		setUsername("");
		setPassword("");
		setUserType("graduate");
		setUserGithub("");
		setIsGraduate(true);
	};

	function handleOption(e) {
		const optionValue = e.target.value;
		setUserType(optionValue);
		setIsGraduate(optionValue === "graduate");
	}

	return (
		<div className="signUpCard">
			<h1>Sign Up</h1>
			<form onSubmit={handleSignUp}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="userType">User Type:</label>
				<select id="userType" value={userType} onChange={handleOption} required>
					<option value="graduate">Graduate</option>
					<option value="mentor">Mentor</option>
					<option value="recruiter">Recruiter</option>
				</select>
				{isGraduate && (
					<>
						<label htmlFor="github">Github Account:</label>
						<input
							type="text"
							id="github"
							value={userGithub}
							onChange={(e) => setUserGithub(e.target.value)}
							required
						/>
						<br />
						<br />
					</>
				)}
				<br />
				<br />
				<button type="submit">Sign Up</button>
			</form>
			{message && <div id="message">{message}</div>}
		</div>
	);
};

export default SignUp;
