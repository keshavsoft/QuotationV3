import express from 'express';

import funcFromshowAll from './showAll/controller.js';

const tableName = "purExpVouchers.json";
const tablePath = "Data/purExpVouchers.json";
const configPath = "Config/Schemas/purExpVouchers.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };