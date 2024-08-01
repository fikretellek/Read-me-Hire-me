import { Route, Routes } from "react-router-dom";

import Header from "./components/AppHeader/AppHeader";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UpdatePasswordForm from "./pages/UpdatePasswordForm";
import InfoPage from "./components/Info/InfoPage";
import Profile from "./components/Profile/Profile";
import MentorDashboard from "./pages/MentorDashboard";

import { Protected } from "./components/Protected";
import Unauthorised from "./pages/Unauthorised";

const App = () => (
	<>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signIn" element={<SignIn />} />
			<Route
				path="/info/:id"
				element={
					<Protected
						element={InfoPage}
						roles={["graduate", "mentor", "recruiter"]}
					/>
				}
			/>
			<Route
				path="/profile/:id"
				element={
					<Protected
						element={Profile}
						roles={["graduate", "mentor", "recruiter"]}
					/>
				}
			/>
			<Route
				path="/mentor-dashboard"
				element={
					<Protected
						element={MentorDashboard}
						roles={["mentor", "recruiter"]}
					/>
				}
			/>
			<Route path="/unauthorised" element={<Unauthorised />} />

			<Route
				path="/update-password"
				element={
					<Protected
						element={UpdatePasswordForm}
						roles={["graduate", "mentor", "recruiter"]}
					/>
				}
			/>
		</Routes>
		<Footer />
	</>
);

export default App;
