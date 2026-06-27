import { JSONFilePreset } from 'lowdb/node';

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    if (!inRequestBody || typeof inRequestBody !== "object") {
        const err = new Error("Request body must be an object");
        err.status = 400;
        throw err;
    }

    // 1. Get primary key from schema
    const schemaDb = await JSONFilePreset(inConfigPath, {});
    await schemaDb.read();

    if (!schemaDb.data || !Array.isArray(schemaDb.data.columnsConfig)) {
        const err = new Error("Invalid schema configuration");
        err.status = 500;
        throw err;
    }

    const pkColumn = schemaDb.data.columnsConfig.find(c => c.primary);
    if (!pkColumn) {
        const err = new Error("Primary key not defined in schema");
        err.status = 500;
        throw err;
    }
    const pk = pkColumn.field;

    // 2. Validate request body has primary key
    if (inRequestBody[pk] === undefined) {
        const err = new Error(`${pk} is required for update`);
        err.status = 400;
        throw err;
    }

    // 3. Read data
    const db = await JSONFilePreset(inTablePath, []);
    await db.read();

    const data = db.data;
    if (!Array.isArray(data)) {
        const err = new Error("Data table is not an array");
        err.status = 500;
        throw err;
    }

    // 4. Find matching record
    const reqPkValue = inRequestBody[pk];
    const index = data.findIndex(item => item[pk] == reqPkValue);

    if (index === -1) {
        const err = new Error(`Record with ${pk} "${reqPkValue}" not found`);
        err.status = 404;
        throw err;
    }

    // 5. Merge existing record with new values
    data[index] = {
        ...data[index],
        ...inRequestBody
    };

    // 6. Write back
    db.data = data;
    await db.write();

    return data[index];
};

export { startFunc };
