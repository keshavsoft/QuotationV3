import express from 'express';

import funcFrominsertGenPk from './insertGenPk/controller.js';
import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import funcFromgroupBy from './groupBy/controller.js';
import { checkColumnName, checkColumnsToSum } from './groupBy/middleware.js';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/groupBy/:columnName', express.json(), checkColumnName({ inConfigPath: configPath }), checkColumnsToSum({ inConfigPath: configPath }), (req, res) => funcFromgroupBy({ req, res, inTablePath: tablePath }));

export { router };