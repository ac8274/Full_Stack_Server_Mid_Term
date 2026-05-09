import { Router } from "express";
import userAuth from "./user.auth.routes.js"

const router = Router();

router.use("/auth",userAuth);

export default router