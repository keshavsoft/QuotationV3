import { getKSTableConfig } from "./getKSTableConfig.js";

const itemsTableConfig = async (inPk) => {
    const config = await fetch("./Index/Configs/vFind/itemsConfig.json");
    // debugger;
    const configJson = await config.json();
    // debugger;
    const pk = inPk;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

const verticalConfig = async (inPk) => {
    const config = await fetch("./Index/Configs/vFind/config.json");
    // debugger;
    const configJson = await config.json();

    // const config = await getKSTableConfig();

    let pk = inPk;

    configJson.endPoints.findFromParams = configJson.endPoints.findFromParams.replace("<pk>", pk);

    return configJson;
};

const startFunc1 = async () => {
    const config = await getKSTableConfig();

    let pk = prompt("Enter quotaion number : ");

    config.endPoints.findFromParams = config.endPoints.findFromParams.replace("<pk>", pk);

    ksVertical = new window.ks.classes.vertical(config);

    ksVertical.callbacks.vertical.onSuccess = fromService => {
        console.log("aaaaaaaaaaaaaabbbbbbbbbbbb : ", fromService);
    };

    ksVertical.initCreate();
};

const startFunc = async () => {

    let pk = prompt("Enter quotaion number : ");

    const config = await verticalConfig(pk);
    // console.log("aaaaaaaaaaaaaabbbbbbbbbbbb : ", config);
    ksVertical = new window.ks.classes.vertical(config);

    ksVertical.callbacks.vertical.onSuccess = fromService => {
        console.log("aaaaaaaaaaaaaabbbbbbbbbbbb : ", fromService);
    };

    ksVertical.initCreate();

    const itemsConfig = await itemsTableConfig(pk);

    itemsConfig.callbacks.table.body.update = fromService => {
        console.log("----- : ", fromService);
    };

    ksTable1 = new window.ks.classes.compTable(itemsConfig);

    ksTable1.initShowTable();

    // itemsTableConfig
};

export default startFunc;