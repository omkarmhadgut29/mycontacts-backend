import express from "express";
import {
    currentUser,
    loginUser,
    registerUser,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/current", validateToken, currentUser);

export { userRouter };
