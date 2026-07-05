import { getKSTableConfig } from "./getKSTableConfig.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    let pk = prompt("Enter quotaion number : ");

    config.endPoints.findFromParams = config.endPoints.findFromParams.replace("<pk>", pk);

    ksVertical = new window.ks.classes.vertical(config);

    ksVertical.callbacks.vertical.onSuccess = fromService => {
        console.log("aaaaaaaaaaaaaabbbbbbbbbbbb : ", fromService);
    };

    // ksVertical = new window.KSAiVertical(config);
    ksVertical.initCreate();

    // await callKSTable(config);
};

export default startFunc;