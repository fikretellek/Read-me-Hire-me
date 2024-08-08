import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormStyles.css";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const { search } = useLocation();

	const queryParams = new URLSearchParams(search);
	const token = queryParams.get("token");
	const email = queryParams.get("email");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError("Passwords do not match.");
		}

		try {
			const response = await fetch("/api/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					token,
					password,
				}),
			});

			if (response.ok) {
				const result = await response.json();
				setMessage(result.message);
				setError("");
			} else {
				const errorResult = await response.json();
				setError(errorResult.message || "An error occurred");
				setMessage("");
			}
		} catch (err) {
			setError(err.response?.message || "An error occurred");
			setMessage("");
		}
	};

	const handleSignIn = () => {
		navigate("/signin");
	};

	return (
		<div className="resetPasswordCard">
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="password">New Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit">Reset Password</button>
			</form>
			{message && <p className="message">{message}</p>}
			{error && <p className="error-message">{error}</p>}
			<div className="goBack">
				<a href="/signin">Sign In</a>
			</div>
		</div>
	);
};

export default ResetPassword;
