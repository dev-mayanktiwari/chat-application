import express from "express";

import { getUsers, searchUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.use("/getUsers", protectRoute, getUsers);
router.use("/searchUsers/:id", protectRoute, searchUser);
export default router;
