import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import readme_logo from "../assets/readme_logo.png";
export function Home() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main role="main">
			<div>
				<img
					className="main_page_logo"
					data-qa="logo"
					src={readme_logo
					}
					alt="read me logo"
				/>
			</div>
			<p>
				<Link to="/signup">Sign Up</Link>
				<Link to="/signIn">Sign in </Link>
				<Link to="/update-password">Update Password</Link>
			</p>
		</main>
	);
}

export default Home;
