import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // To get query parameters

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const { search } = useLocation();

	const queryParams = new URLSearchParams(search);
	const token = queryParams.get("token");
	const email = queryParams.get("email");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError("Passwords do not match.");
		}

		try {
			const response = await axios.post("/api/reset-password", {
				email,
				token,
				password,
				passwordHash: password, // Ensure hashing happens on the backend
			});
			setMessage(response.data.message);
			setError("");
		} catch (err) {
			setError(err.response?.data.message || "An error occurred");
			setMessage("");
		}
	};

	return (
		<div>
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
			{message && <p style={{ color: "green" }}>{message}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export default ResetPassword;
