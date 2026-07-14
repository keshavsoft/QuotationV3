import express from 'express';

import { router as routerFrompurExpVouchers } from "./purExpVouchers/end-points.js";

const router = express.Router()

router.use("/purExpVouchers", routerFrompurExpVouchers);;

export { router };