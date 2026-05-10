import { Router } from "express";
import userRoutes from "./user/index.js"
import ordersRoutes from "./orders/index.js"
import productsRoutes from "./products/index.js"

const router = Router();

router.use("/user",userRoutes)

router.use("/products",productsRoutes)

router.use("/orders",ordersRoutes)

export default router