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
    const dataToShow = await getData();
    // debugger
    // dataToShow.sort((a, b) => a.ledgername - b.ledgername);
    dataToShow.sort((a, b) => a.ledgername.localeCompare(b.ledgername));
    config.defaults.data = dataToShow;
    // console.log("config : ", config);

    ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();
};

export default startFunc;