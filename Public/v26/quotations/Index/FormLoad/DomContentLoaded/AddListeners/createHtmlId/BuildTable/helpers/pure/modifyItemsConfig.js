/**
 * Pure function to modify the items configuration with parent PK defaultValue and read endpoints.
 * @param {Object} configJson - The raw configuration json.
 * @param {string|number} pk - The parent PK.
 * @returns {Object} A new configuration object with modifications.
 */
const modifyItemsConfig = (configJson, pk) => {
    const clonedConfig = JSON.parse(JSON.stringify(configJson));

    const findColumn = clonedConfig.columnsConfig.find(element => element.field === "ParentPk");
    if (findColumn) {
        findColumn.defaultValue = parseInt(pk);
    }

    if (clonedConfig.endPoints && clonedConfig.endPoints.read) {
        clonedConfig.endPoints.read = clonedConfig.endPoints.read.replace("<ParentPk>", pk);
    }

    return clonedConfig;
};

export { modifyItemsConfig };
