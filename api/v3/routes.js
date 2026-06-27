import express from 'express';
import { router as routerFromItemsTable } from "./ItemsTable/end-points.js";

const router = express.Router()
router.use("/ItemsTable", routerFromItemsTable);;

export { router };