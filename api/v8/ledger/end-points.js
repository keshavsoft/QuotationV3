import express from 'express';

import funcFromfind from './find/controller.js';
import funcFromshowAll from './showAll/controller.js';

const tableName = "purExpVouchers.json";
const tablePath = "Data/purExpVouchers.json";
const configPath = "Config/Schemas/purExpVouchers.json";

const router = express.Router();

router.get('/find/:ledgerName', (req, res) => funcFromfind({ req, res, inTablePath: tablePath }));
router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };