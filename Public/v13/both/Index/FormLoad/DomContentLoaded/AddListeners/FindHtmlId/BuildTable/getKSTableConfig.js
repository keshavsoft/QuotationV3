const getVerticalConfig = async () => {
    const config = await fetch("./Index/Configs/vertical/config.json");
    // debugger;
    const configJson = await config.json();

    return configJson;
};

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

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

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