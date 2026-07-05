import onReadFail from "../../../CommonFuncs/onReadFail.js";

let jFLocalToInputhtmlId = (inValue) => {
    let jVarLocalHtmlId = 'htmlId';
    let jVarLocalhtmlId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalhtmlId === null === false) {
        jVarLocalhtmlId.innerHTML = inValue;
    };
};

const prepareConfig = async (inpk) => {
    const config = await fetch("./Index/Configs/find/config.json");
    // debugger;
    const configJson = await config.json();

    const pk = inpk;

    if (pk === null || pk.trim() === "") return;

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

export const getKSTableConfig1 = async () => {
    const config = await fetch("./Index/Configs/find/config.json");
    // debugger;
    const configJson = await config.json();

    const pk = prompt("Enter PK");

    if (pk === null || pk.trim() === "") return;

    jFLocalToInputhtmlId(pk);

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });
    // console.log("configJson : ", findColumn, pk);

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

export const getKSTableConfig = async () => {
    const pk = prompt("Enter PK");

    if (pk === null || pk.trim() === "") return;

    jFLocalToInputhtmlId(pk);

    return await prepareConfig(pk);
};