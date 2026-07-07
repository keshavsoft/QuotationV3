import { getKSTableConfig } from "./getKSTableConfig.js";

const itemsTableConfig = async (inPk) => {
    const config = await fetch("./Index/Configs/vertical/itemsConfig.json");
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

let jFLocalToInputkSTableContainer = (inValue) => {
    let jVarLocalHtmlId = 'kSTableContainer';
    let jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer === null === false) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    };
};

const startFunc = async () => {
    const config = await getKSTableConfig();

    ksVertical = new window.ks.classes.vertical(config);

    ksVertical.callbacks.vertical.onSuccess = async fromService => {
        if (fromService) {
            const itemsConfig = await itemsTableConfig(fromService);

            itemsConfig.callbacks.table.body.update = fromService => {
                console.log("----- : ", fromService);
            };

            ksTable1 = new window.ks.classes.compTable(itemsConfig);

            ksTable1.initShowTable();
        };
    };
    // ksVertical = new window.KSAiVertical(config);
    ksVertical.initCreate();

    jFLocalToInputkSTableContainer("");
};

export default startFunc;