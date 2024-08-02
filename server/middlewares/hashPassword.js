// const hashPassword = async (password) => {
// 	const encoder = new TextEncoder();
// 	const data = encoder.encode(password);
// 	const hash = await crypto.subtle.digest("SHA-256", data);
// 	return Array.from(new Uint8Array(hash))
// 		.map((b) => b.toString(16).padStart(2, "0"))
// 		.join("");
// };

// export { hashPassword };
import crypto from "crypto";

export default async function hashPassword(req, res, next) {
	if (req.body.password) {
		const encoder = new TextEncoder();
		const data = encoder.encode(req.body.password);
		const hash = await crypto.subtle.digest("SHA-256", data);
		const hashedPassword = Array.from(new Uint8Array(hash))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
		req.body.passwordHash = hashedPassword;
	}
	next();
}
