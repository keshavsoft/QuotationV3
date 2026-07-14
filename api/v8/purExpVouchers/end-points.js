import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFromdistinct from './distinctDate/controller.js';
import funcFromcount from './count/controller.js';
import funcFromDistinctLedgerName from './distinctLedgerName/controller.js';
import funcFromgroupBy from './groupBy/controller.js';
import { checkColumnName, checkColumnsToSum } from './groupBy/middleware.js';

const tableName = "purExpVouchers.json";
const tablePath = "Data/purExpVouchers.json";
const configPath = "Config/Schemas/purExpVouchers.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/distinctDate', (req, res) => funcFromdistinct({ req, res, inTablePath: tablePath }));
router.get('/count', (req, res) => funcFromcount({ req, res, inTablePath: tablePath }));
router.get('/distinctLedgerName', (req, res) => funcFromDistinctLedgerName({ req, res, inTablePath: tablePath }));
router.post('/groupBy/:columnName', express.json(), (req, res) => funcFromgroupBy({ req, res, inTablePath: tablePath }));

export { router };