import getData from "./getData.js";
import extractColumns from "./helpers/extractColumns.js";
import getDistinct from "./helpers/getDistinct.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const requiredColumns = extractColumns({
        inColumnName: "date",
        dataAsArray
    });

    const distinctNames = getDistinct({
        inDataArray: requiredColumns
    });

    return distinctNames;
};

export { startFunc };
