import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFromdistinct from './distinct/controller.js';

const tableName = "LedgerNames.json";
const tablePath = "Data/LedgerNames.json";
const configPath = "Config/Schemas/LedgerNames.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/distinct/:columnName', (req, res) => funcFromdistinct({ req, res, inTablePath: tablePath }));

export { router };