import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/signup" element={<SignUp />} />
		<Route path="/signIn" element={<SignIn />} />
	</Routes>
);

export default App;
