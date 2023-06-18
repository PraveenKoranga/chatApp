import express from "express";
import { AllMessages, sendMessage } from "../controller/messageController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadFile } from "../middleware/uploadAttachements.js";

const messageRoutes = express.Router();

messageRoutes.route("/").post(protect, sendMessage);
messageRoutes.route("/upload-file").post(protect, uploadFile);
// messageRoutes.route("/attachments/:sender/:doc").get(getFile);
messageRoutes.route("/:chatId").get(protect, AllMessages);

export default messageRoutes;
