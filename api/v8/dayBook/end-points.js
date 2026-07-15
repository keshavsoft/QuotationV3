import express from 'express';

import funcFromfind from './find/controller.js';

const tableName = "purExpVouchers.json";
const tablePath = "Data/purExpVouchers.json";
const configPath = "Config/Schemas/purExpVouchers.json";

const router = express.Router();

router.get('/find/:fromDate/:toDate', (req, res) => funcFromfind({ req, res, inTablePath: tablePath }));

export { router };