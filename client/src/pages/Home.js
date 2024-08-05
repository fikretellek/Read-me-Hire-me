import { Link } from "react-router-dom";
import "./Home.css";
import readme_logo from "../assets/readme_logo.png";
import jwtDecode from "jwt-decode";

export function Home({ signedIn }) {
	function getDashboard() {
		const token = localStorage.getItem("token");
		const decodedToken = jwtDecode(token);
		if (decodedToken.userType === "mentor") {
			return (
				<p>
					<a href="/mentor-dashboard">Dashboard</a>
				</p>
			);
		} else {
			return (
				<p>
					<a href={`/profile/${decodedToken.id}`}>Dashboard</a>
				</p>
			);
		}
	}

	return (
		<main role="main">
			<div>
				<img
					className="main_page_logo"
					data-qa="logo"
					src={readme_logo}
					alt="read me logo"
				/>
			</div>
			{signedIn ? (
				getDashboard()
			) : (
				<p>
					<Link to="/signup">Sign Up</Link>
					<Link to="/signIn">Sign in </Link>
				</p>
			)}
		</main>
	);
}

export default Home;
