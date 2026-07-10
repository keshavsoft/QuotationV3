import express from 'express';
import { router as routerFromLedgerNames } from "./LedgerNames/end-points.js";

const router = express.Router()
router.use("/LedgerNames", routerFromLedgerNames);;

export { router };