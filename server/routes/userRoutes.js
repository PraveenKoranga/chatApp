import express from "express";
import {
  allUsers,
  allUserss,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(protect, allUsers);
userRouter.post("/login", loginUser);
userRouter.get("/getAllUser", allUserss);

export default userRouter;
