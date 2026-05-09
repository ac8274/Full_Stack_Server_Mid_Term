import { Router } from "express";
import { registerUser, logInUser,updateUserPassword } from "../../controllers/user.auth.controller.js";

const router = Router();

router.post("/login",logInUser);
router.post("/register",registerUser);


router.patch("/updatePassword",updateUserPassword);

export default router