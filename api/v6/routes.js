import express from 'express';
import { router as routerFromBillsTable } from "./BillsTable/end-points.js";

const router = express.Router()
router.use("/BillsTable", routerFromBillsTable);;

export { router };