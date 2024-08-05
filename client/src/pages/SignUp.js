import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./FormStyles.css";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("graduate");
	const [message, setMessage] = useState("");
	const [isGraduate, setIsGraduate] = useState(true);
	const [userGithub, setUserGithub] = useState("");

	const navigate = useNavigate();

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleSignUp = async (event) => {
		event.preventDefault();

		// Email validation check
		if (!emailRegex.test(email)) {
			setMessage("Error: Invalid email format");
			return;
		}

		const response = await fetch("/api/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				userType,
				userGithub,
			}),
		});

		const result = await response.json();

		if (response.ok) {
			setMessage(`User created with ID: ${result.data.id}`);
			navigate("/signIn");
		} else if (response.status === 409) {
			setMessage("Error: Email or Github Username already exists");
		} else {
			setMessage(`Error: ${result.message || result.error}`);
		}
		setEmail("");
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
				<label htmlFor="email">Email:</label>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
