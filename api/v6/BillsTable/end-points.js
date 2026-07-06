import express from 'express';

import funcFrommodify from './modify/controller.js';

const tableName = "BillsTable.json";
const tablePath = "Data/BillsTable.json";
const configPath = "Config/Schemas/BillsTable.json";

const router = express.Router();

router.put('/modify', express.json(), (req, res) => funcFrommodify({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

export { router };