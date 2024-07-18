import React, { useState } from "react";
import "./SignUp.css";
import { hashPassword } from "Util.js";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("graduate");
	const [message, setMessage] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();

		const passwordHash = await hashPassword(password);

		const response = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, passwordHash, userType }),
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
	};



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
				<select
					id="userType"
					value={userType}
					onChange={(e) => setUserType(e.target.value)}
					required
				>
					<option value="graduate">Graduate</option>
					<option value="mentor-rec">Mentor / Recruiter </option>
				</select>
				<br />
				<br />

				<button type="submit">Sign Up</button>
			</form>
			{message && <div id="message">{message}</div>}
		</div>
	);
};

export default SignUp;
