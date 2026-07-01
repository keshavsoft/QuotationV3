import express from 'express';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

export { router };