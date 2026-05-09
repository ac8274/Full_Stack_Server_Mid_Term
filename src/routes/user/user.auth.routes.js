import { Router } from "express";
import { registerUser, logInUser,updateUserPassword, deleteUser } from "../../controllers/user.auth.controller.js";

const router = Router();

router.post("/login",logInUser);
router.post("/register",registerUser);

router.patch("/updatePassword",updateUserPassword);

router.delete("/deleteUser",deleteUser)

export default router