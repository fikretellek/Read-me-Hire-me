import path from "node:path";

import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";

import logger from "./logger";
import config from "./config";
import jwt from "jsonwebtoken";

export const clientRouter = (apiRoot) => {
	const staticDir = path.join(__dirname, "..", "static");
	const router = Router();
	router.use(express.static(staticDir));
	router.use((req, res, next) => {
		if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
			return res.sendFile(path.join(staticDir, "index.html"));
		}
		next();
	});
	return router;
};

export const configuredHelmet = () => helmet({ contentSecurityPolicy: false });

export const configuredMorgan = () =>
	morgan("dev", {
		stream: { write: (message) => logger.info(message.trim()) },
	});

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	logger.error("%O", err);
	res.sendStatus(500);
};


// Middleware to authorize roles
export const roleBasedAuth = (...roles) => {
	return (req, res, next) => {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return res.sendStatus(401);
		}

		jwt.verify(token, config.jwtSecret, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			if (!roles.includes(req.user.userType)) {
				return res.sendStatus(403);
			}
			next();
		});
	};
};