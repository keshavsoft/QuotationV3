import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFromdistinct from './distinctDate/controller.js';
import funcFromcount from './count/controller.js';

const tableName = "purExpVouchers.json";
const tablePath = "Data/purExpVouchers.json";
const configPath = "Config/Schemas/purExpVouchers.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/distinctDate', (req, res) => funcFromdistinct({ req, res, inTablePath: tablePath }));
router.get('/count', (req, res) => funcFromcount({ req, res, inTablePath: tablePath }));

export { router };