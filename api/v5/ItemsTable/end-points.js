import express from 'express';

import funcFrominsertGenPk from './insertGenPk/controller.js';
import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import funcFromgroupBy from './groupBy/controller.js';
import { checkColumnName, checkColumnsToSum } from './groupBy/middleware.js';
import funcFromGroupByParentPk from './groupByParentPk/controller.js';
import funcFrommodify from './modify/controller.js';
import funcFromdel from './del/controller.js';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/groupBy/:columnName', express.json(), checkColumnName({ inConfigPath: configPath }), checkColumnsToSum({ inConfigPath: configPath }), (req, res) => funcFromgroupBy({ req, res, inTablePath: tablePath }));
router.get('/groupByParentPk', (req, res) => funcFromGroupByParentPk({ req, res, inTablePath: tablePath }));
router.put('/modify', express.json(), (req, res) => funcFrommodify({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));

export { router };