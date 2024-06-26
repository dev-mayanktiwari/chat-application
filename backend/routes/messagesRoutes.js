import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();

router.post("/sendMessage/:id", protectRoute, sendMessage);
router.post("/getMessage/:id", protectRoute,  getMessage)

export default router;
