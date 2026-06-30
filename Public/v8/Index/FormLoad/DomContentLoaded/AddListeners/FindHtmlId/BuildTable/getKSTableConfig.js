import onReadFail from "../../../CommonFuncs/onReadFail.js";

const alterConfig = async (inConfig, inPk) => {
    const configJson = inConfig;

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

export const getKSTableConfig = async () => {

    const config = await fetch("./Index/Configs/Table/config.json");
    // debugger;
    const configJson = await config.json();

    const pk = prompt("Enter PK");

    if (pk === null || pk.trim() === "") return;

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};