import express from 'express';

import funcFromdel from './del/controller.js';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));

export { router };