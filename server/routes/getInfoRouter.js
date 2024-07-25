import { Router } from "express";
import getReadme from "../controller/getReadme";
import getActivity from "../controller/getActivity";

const router = Router();

router.get("/:id/readme", getReadme);
router.get("/:id/activity", getActivity);

export default router;
