import React from "react";

const Unauthorised = () => {

	return (
		<div className="container">
			<h1>403</h1>
			<p>Unauthorized Access</p>
			<p>You do not have permission to access this page.</p>
			<p>
				<a href="/">Go back to Home</a>
			</p>
		</div>
	);
};

export default Unauthorised;
