import insertBase from "./insertBase.js";
import getData from "./helpers/getData.js";
import getSchema from "./helpers/getSchema.js";
import { getPrimaryKey } from "./helpers/pkHelper.js";

const validateInput = ({ record }) => {
    if (!record || typeof record !== "object") {
        throw new Error("record must be object");
    }
};

const updateRecord = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    validateInput({ record: inRequestBody });

    const schema = await getSchema({ inConfigPath });
    const pk = getPrimaryKey(schema.columnsConfig);

    if (inRequestBody[pk] === undefined) {
        // throw new Error(`${pk} is required for update`);

        const err = new Error(`${pk} is required for update`);
        err.status = 400;
        throw err;
    };

    const data = await getData({ inTablePath });

    const index = data.findIndex(item => item[pk] === inRequestBody[pk]);

    if (index === -1) {
        throw new Error("Record not found");
    }

    // Merge existing record with new values
    data[index] = {
        ...data[index],
        ...inRequestBody
    };

    await insertBase({
        inRequestBody: data,
        inTablePath
    });

    return data[index];
};

export default updateRecord;