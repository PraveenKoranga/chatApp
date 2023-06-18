import express from "express";
import {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controller/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const chatRoutes = express.Router();

chatRoutes.route("/").post(protect, accessChat);
chatRoutes.route("/").get(protect, fetchChat);
chatRoutes.route("/group").post(protect, createGroupChat);
chatRoutes.route("/rename").put(protect, renameGroup);
chatRoutes.route("/groupremove").put(protect, removeFromGroup);
chatRoutes.route("/groupadd").put(protect, addToGroup);

export default chatRoutes;
