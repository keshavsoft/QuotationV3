import { fetchConfig } from "./fetchConfig.js";
import getVerticalConfig from "./verticalConfig.js";

const startFunc = async () => {
    const config = await fetchConfig();

    ksTable1 = new window.ks.classes.compTable(config);

    await ksTable1.initShowTable();

    const verticalConfig = await getVerticalConfig();

    ksTable2 = new window.KSAiVertical(verticalConfig);
    // ksTable2 = new window.ks.components.htmlForm(config);

    await ksTable2.initCreate();
};

export default startFunc;