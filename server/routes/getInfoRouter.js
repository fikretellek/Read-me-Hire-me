import { Router } from "express";
import getReadme from "../controller/getReadme";
import getActivity from "../controller/getActivity";
import getProjects from "../controller/getPinnedProjects";

const router = Router();

router.get("/:id/readme", getReadme);
router.get("/:id/activity", getActivity);
router.get("/:id/projects", getProjects)

export default router;