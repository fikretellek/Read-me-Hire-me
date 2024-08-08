import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/request-password-reset", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
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
			console.error(err);
			setError(err.response?.message || "An error occurred");
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
			<button onClick={handleBack}>Back</button>
		</div>
	);
};

export default ForgotPassword;
