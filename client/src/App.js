import { Route, Routes } from "react-router-dom";

import Header from "./components/AppHeader/AppHeader";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UpdatePasswordForm from "./pages/UpdatePasswordForm";
import { Protected } from "./pages/Protected";


const App = () => (
	<>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signIn" element={<SignIn />} />
			{/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
			{/* <Route path="/grad-dashboard" element={<Protected element={GradDashboard} roles={["graduate", "mentor", "recruiter"]} />} /> */}
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
