import express from 'express';

import { router as routerFromledger } from './ledger/end-points.js';

import { router as routerFrompurExpVouchers } from "./purExpVouchers/end-points.js";

const router = express.Router()

router.use("/purExpVouchers", routerFrompurExpVouchers);;
router.use('/ledger', routerFromledger);

export { router };