import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Protected = ({ element: Element, roles, props }) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/signIn" />;
	}

	const decodedToken = jwtDecode(token);
	if (roles && roles.indexOf(decodedToken.userType) === -1) {
		return <Navigate to="/unauthorised" />;
	}

	return <Element {...props} />;
};
