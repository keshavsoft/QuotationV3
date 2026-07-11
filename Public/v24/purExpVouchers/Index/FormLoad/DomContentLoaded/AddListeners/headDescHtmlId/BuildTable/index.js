import { getKSTableConfig } from "./getKSTableConfig.js";
import { getData } from "./helpers/getData.js";

const jFLocalToInputkSTableContainer = (inValue) => {
    const jVarLocalHtmlId = 'kSTableContainer';
    const jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    }
};

const startFunc = async () => {
    jFLocalToInputkSTableContainer("");

    const config = await getKSTableConfig();

    config.defaults.data = await getData();

    const ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();
};

export default startFunc;