import express from 'express';
import { router as routerFromBillsTable } from "./BillsTable/end-points.js";
import { router as routerFromItemsTable } from "./ItemsTable/end-points.js";
import { router as routerFromStockItems } from "./StockItems/end-points.js";

const router = express.Router()
router.use("/StockItems", routerFromStockItems);
router.use("/ItemsTable", routerFromItemsTable);
router.use("/BillsTable", routerFromBillsTable);;

export { router };