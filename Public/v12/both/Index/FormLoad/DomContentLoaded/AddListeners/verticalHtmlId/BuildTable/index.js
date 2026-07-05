import { getKSTableConfig } from "./getKSTableConfig.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    ksVertical = new window.ks.classes.vertical(config);


    // ksVertical = new window.KSAiVertical(config);
    ksVertical.initCreate();

    // await callKSTable(config);
};

export default startFunc;