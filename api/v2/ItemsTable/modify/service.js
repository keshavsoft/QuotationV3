import insertGenPk from "./insertGenPk.js";
import updateRecord from "./updateRecord.js";

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    const insertedPk = await updateRecord({ inRequestBody, inTablePath, inConfigPath });

    return insertedPk;
};

export { startFunc };
