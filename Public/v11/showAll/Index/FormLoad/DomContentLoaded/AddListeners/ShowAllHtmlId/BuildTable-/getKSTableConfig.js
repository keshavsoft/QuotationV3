import onReadFail from "../../../CommonFuncs/onReadFail.js";

export const getKSTableConfig = async () => {

    const config = await fetch("./Index/Configs/ShowAll/config.json");
    // debugger;
    const configJson = await config.json();

    const last = await fetch("/api/v2/ItemsTable/lastRecord");
    // debugger;
    
    let lastJson = { ParentPk: 0 };
    if (last.ok) {
        const text = await last.text();
        if (text) {
            lastJson = JSON.parse(text);
        }
    }

    const pk = (lastJson.ParentPk || 0) + 1;

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