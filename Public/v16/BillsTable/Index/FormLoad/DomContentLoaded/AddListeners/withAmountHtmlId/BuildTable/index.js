import { getKSTableConfig } from "./getKSTableConfig.js";

const getData = async () => {
    const config = await fetch("/api/v4/ItemsTable/groupBy");
    // debugger;
    const data = await config.json();

    return await data;
};

const startFunc = async () => {
    const config = await getKSTableConfig();

    config.defaults.data = await getData();

    ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();

    // await callKSTable(config);
};

export default startFunc;