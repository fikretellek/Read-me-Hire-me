import { Link } from "react-router-dom";
import cyf_logo from "../../assets/cyf_logo.png";
import "./AppHeader.css";

const Header = () => (
	<header className="header">
		<div className="logo">
			<Link to="/">
				<img className="app__logo" src={cyf_logo} alt="CYF Logo" />
			</Link>
		</div>
		<nav className="nav">
			<Link to="/signup">Sign Up</Link>
		</nav>
	</header>
);

export default Header;
