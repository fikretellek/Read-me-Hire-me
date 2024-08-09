import React, { useState } from "react";
import "./FormStyles.css";
import { useNavigate } from "react-router-dom";


const authenticateUser = async (email, password) => {
	try {
		const response = await fetch("/api/sign-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const result = await response.json();
			return { success: true, data: result.data };
		} else {
			const errorResult = await response.json();
			return {
				success: false,
				message: errorResult.message || "Authentication failed",
			};
		}
	} catch (error) {
		return { success: false, message: "Network error" };
	}
};

const SignIn = ({ setSignedIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleSignIn = async (event) => {
		event.preventDefault();

		// Email validation check
		if (!emailRegex.test(email)) {
			setMessage("Error: Invalid email format");
			setPassword("");
			return;
		}

		const result = await authenticateUser(email, password);

		if (result.success) {
			localStorage.setItem("token", result.data.user.token);
			setSignedIn(true);
			if (result.data.user.user_type === "mentor") {
				navigate("/mentor-dashboard");
			} else if (result.data.user.user_type === "graduate") {
				navigate(`/info/${result.data.id}`);
			}
		} else {
			setMessage(`Error: ${result.message}`);
			setPassword("");
		}
	};

	return (
		<div className="signInCard">
			<h1>Sign In</h1>
			<form onSubmit={handleSignIn}>
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

				<button type="submit">Sign In</button>
			</form>
			{message && <div className="message">{message}</div>}
			<div className="unique-signup">
				Don't have an account? <a href="/signup">Sign up</a>
			</div>
			<div className="forgot-password">
				<a href="/forgot-password">Forgot your password?</a>
			</div>
		</div>
	);
};

export default SignIn;
