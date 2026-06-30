import express from 'express';

import funcFromgroupBy from './groupBy/controller.js';

const tableName = "ItemsTable";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.get('/groupBy', (req, res) => funcFromgroupBy({ req, res, inTablePath: tablePath }));

export { router };