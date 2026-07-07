import onReadFail from "../../../../CommonFuncs/onReadFail.js";

const itemsTableModifyUrl = "/api/v5/ItemsTable/modify";
const parentPkField = "ParentPk";
const parentPkToken = "<ParentPk>";

async function updateData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error during PUT request:", error);
        throw error;
    }
}

const hasValue = value => value !== undefined && value !== null;

const parseParentPk = lastPk => {
    const parsedPk = parseInt(lastPk, 10);

    return isNaN(parsedPk) ? 0 : parsedPk;
};

const findParentPkColumn = columnsConfig => {
    if (!Array.isArray(columnsConfig)) return;

    return columnsConfig.find(element => element.field === parentPkField);
};

const cloneConfig = configJson => ({ ...configJson });

const wireReadFailCallback = modifiedConfig => {
    if (modifiedConfig.callbacks?.table) {
        modifiedConfig.callbacks.table.onReadFail = onReadFail;
    }
};

const setParentPkDefault = ({ modifiedConfig, lastPk }) => {
    const parentPkColumn = findParentPkColumn(modifiedConfig.columnsConfig);

    if (parentPkColumn) {
        parentPkColumn.defaultValue = parseParentPk(lastPk);
    }
};

const replaceReadEndpointParentPk = ({ modifiedConfig, lastPk }) => {
    if (modifiedConfig.endPoints?.read && hasValue(lastPk)) {
        modifiedConfig.endPoints.read = modifiedConfig.endPoints.read.replace(parentPkToken, lastPk);
    }
};

const saveUpdatedRow = alterRow => {
    updateData(itemsTableModifyUrl, alterRow).then();
};

const wireRowUpdateCallback = modifiedConfig => {
    if (modifiedConfig.callbacks?.table?.body) {
        modifiedConfig.callbacks.table.body.update = saveUpdatedRow;
    }
};

const transformConfig = ({ configJson, lastPk }) => {
    const modifiedConfig = cloneConfig(configJson);

    wireReadFailCallback(modifiedConfig);
    setParentPkDefault({ modifiedConfig, lastPk });
    replaceReadEndpointParentPk({ modifiedConfig, lastPk });
    wireRowUpdateCallback(modifiedConfig);

    return modifiedConfig;
};

export { transformConfig };
