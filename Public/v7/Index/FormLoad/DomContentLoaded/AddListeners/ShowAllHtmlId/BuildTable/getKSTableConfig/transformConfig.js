import onReadFail from "../../../../CommonFuncs/onReadFail.js";

const transformConfig = ({ configJson, lastPk }) => {
    const modifiedConfig = { ...configJson };

    if (modifiedConfig.callbacks?.table) {
        modifiedConfig.callbacks.table.onReadFail = onReadFail;
    }

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
    }

    return modifiedConfig;
};

export { transformConfig };
