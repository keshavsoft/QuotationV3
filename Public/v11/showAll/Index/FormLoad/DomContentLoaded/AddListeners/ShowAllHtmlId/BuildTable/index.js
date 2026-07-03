import { getKSTableConfig } from "./getKSTableConfig.js";
import { callKSTable } from "./callKSTable.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    ksTable1 = new window.KSAiCompTable(config);

    ksTable1.initShowTable();
    // await callKSTable(config);
};

export default startFunc;