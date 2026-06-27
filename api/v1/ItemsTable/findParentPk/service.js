import getData from "./getData.js";

const startFunc = async ({ inPk, inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });

    const findRow = dataAsArray.filter(element => {
        return element.ParentPk === parseInt(inPk);
    });

    return await findRow;
};

export { startFunc };
