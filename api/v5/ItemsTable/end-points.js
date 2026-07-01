import express from 'express';

import funcFrominsertGenPk from './insertGenPk/controller.js';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.post('/insertGenPk', express.json(), (req, res) => funcFrominsertGenPk({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

export { router };