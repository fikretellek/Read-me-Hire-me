import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UpdatePasswordForm from "./pages/UpdatePasswordForm";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/signup" element={<SignUp />} />
		<Route path="/signIn" element={<SignIn />} />
		<Route path="/update-password" element={<UpdatePasswordForm />} />
	</Routes>
);

export default App;
