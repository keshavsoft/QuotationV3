import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFrominsertGenPk from './insertGenPk/controller.js';
import funcFrommodify from './modify/controller.js';

const tableName = "ItemsTable";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.put('/modify', express.json(), (req, res) => funcFrommodify({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

export { router };