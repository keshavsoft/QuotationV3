import onReadFail from "../../../CommonFuncs/onReadFail.js";

export const getKSTableConfig = async () => {
    const config = await fetch("./Index/Configs/Table/config.json");
    // debugger;
    const configJson = await config.json();

    return configJson;
};