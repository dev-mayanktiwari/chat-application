import express from "express";

import { getUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.use("/getUsers", protectRoute, getUsers);
// router.use("/searchUsers", protectRoute, searchUser);

export default router;
