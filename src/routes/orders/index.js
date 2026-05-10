import { Router } from "express";
import orderItemsAddition from "./orders.addItems.js"
import ordersInfo from "./orders.info.js"

const router = Router();

router.use("/addItems",orderItemsAddition)

router.use("/info",ordersInfo)

export default router