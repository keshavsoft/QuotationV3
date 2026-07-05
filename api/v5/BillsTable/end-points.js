import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFrominsertGenPk from './insertGenPk/controller.js';
import funcFrominsertWithMeta from './insertWithMeta/controller.js';
import funcFromdel from './del/controller.js';
import funcFromfind from './find/controller.js';

const tableName = "BillsTable.json";
const tablePath = "Data/BillsTable.json";
const configPath = "Config/Schemas/BillsTable.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsertWithMeta({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));
router.get('/find/:pk', (req, res) => funcFromfind({ req, res, inTablePath: tablePath }));

export { router };