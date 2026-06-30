import onReadFail from "../../../../CommonFuncs/onReadFail.js";
// import configJsonForTable from "./Index/Configs/Table/config.json" with { type: "json" };

const alterConfig = async (inPk) => {
    const config = await fetch("./Index/Configs/Table/config.json");
    // debugger;
    const configJson = await config.json();

    // const configJson = configJsonForTable;

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(inPk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", inPk);

    return configJson;
};

const transformConfig = async ({ configJson, lastPk }) => {
    const modifiedConfig = { ...configJson };

    if (modifiedConfig.callbacks?.table) {
        modifiedConfig.callbacks.table.onReadFail = onReadFail;
    };

    if (modifiedConfig.callbacks?.table?.onEdit === "function") {
        modifiedConfig.callbacks.table.onEdit = async (presentPk) => {
            const tableConfig = await alterConfig(presentPk);

            window.KSTableComp.initShowTable(tableConfig);
        };
    };

    if (Array.isArray(modifiedConfig.columnsConfig)) {
        const parentPkColumn = modifiedConfig.columnsConfig.find(
            element => element.field === "ParentPk"
        );
        if (parentPkColumn) {
            const parsedPk = parseInt(lastPk, 10);
            parentPkColumn.defaultValue = isNaN(parsedPk) ? 0 : parsedPk;
        }
    }

    if (modifiedConfig.endPoints?.read && lastPk !== undefined && lastPk !== null) {
        modifiedConfig.endPoints.read = modifiedConfig.endPoints.read.replace("<ParentPk>", lastPk);
    };

    return modifiedConfig;
};

export { transformConfig };
