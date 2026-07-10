import express from 'express';
import { router as routerFromLedgerNames } from "./LedgerNames/end-points.js";
import { router as routerFrompurExpVouchers } from "./purExpVouchers/end-points.js";

const router = express.Router()
router.use("/purExpVouchers", routerFrompurExpVouchers);
router.use("/LedgerNames", routerFromLedgerNames);;

export { router };