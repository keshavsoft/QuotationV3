import onReadFail from "../../../CommonFuncs/onReadFail.js";

export const getKSTableConfig = async () => {

    const config = await fetch("./Index/Configs/Table/config.json");
    // debugger;
    const configJson = await config.json();

    const last = await fetch("/api/v2/ItemsTable/lastRecord");

    // debugger;
    if (last.ok) {
        const lastJson = await last.json();
        console.log("lastJson: ", lastJson)
        const pk = lastJson.ParentPk;
    }
    const lastJson = await last.json();

    const pk = lastJson.ParentPk;

    // const pk = prompt("Enter PK");

    // if (pk === null || pk.trim() === "") return;

    configJson.callbacks.table.onReadFail = onReadFail;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = parseInt(pk);

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};