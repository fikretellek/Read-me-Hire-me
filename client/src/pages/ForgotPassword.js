import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/request-password-reset", {
				email,
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
			<h1>Forgot Password</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Request Password Reset</button>
			</form>
			{message && <p style={{ color: "green" }}>{message}</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export default ForgotPassword;
