import express from 'express';

import funcFromlastRecord from './lastRecord/controller.js';

const tableName = "ItemsTable";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.get('/lastRecord', (req, res) => funcFromlastRecord({ req, res, inTablePath: tablePath }));

export { router };