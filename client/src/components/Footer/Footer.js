import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
	<footer className="footer">
		<div className="footer-content">
			<nav className="nav">
				<Link to="/about">About Us</Link>
				<a
					href="https://github.com/RbAvci/Read-me-Hire-me"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<Link to="/contact">Contact</Link>
			</nav>
			<div className="copyright">
				&copy; {new Date().getFullYear()} CYF. All rights reserved.
			</div>
		</div>
	</footer>
);

export default Footer;
