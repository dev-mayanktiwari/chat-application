import express from "express";

import { getUsers, searchUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.use("/getUsers/:id", protectRoute, getUsers);
router.use("/searchUsers", protectRoute, searchUser);
export default router;
