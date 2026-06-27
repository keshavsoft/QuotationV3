import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import funcFrominsertGenPk from './insertGenPk/controller.js';
import funcFromdel from './del/controller.js';
import funcFromfilter from './filter/controller.js';
import findParentPk from './findParentPk/controller.js';

const tableName = "ItemsTable";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));
router.post('/filter', express.json(), (req, res) => funcFromfilter({ req, res, inTablePath: tablePath, inConfigPath: configPath }));
router.get('/findParentPk/:pk', (req, res) => findParentPk({ req, res, inTablePath: tablePath }));

export { router };