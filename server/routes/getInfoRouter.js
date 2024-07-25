import { Router } from "express";
import getReadme from "../controller/getReadme";

const router = Router();

router.get("/:id/readme", getReadme);

export default router;
