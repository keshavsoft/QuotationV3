import { getKSTableConfig } from "./getKSTableConfig.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    ksTable1 = new window.ks.classes.compTable(config);
    await ksTable1.initShowTable();
    // await callKSTable(config);
};

export default startFunc;