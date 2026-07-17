import express from 'express';
import { router as routerFromledgerNames } from "./ledgerNames/routes.js";

const router = express.Router()
router.use("/ledgerNames", routerFromledgerNames);;

export { router };