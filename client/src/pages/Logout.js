import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = ({ setSignedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setSignedIn(false);
        navigate("/signIn");
    };

    return (
        <div className="logout">
            <h1>Are you sure you want to logout?</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;