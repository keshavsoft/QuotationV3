import { getKSTableConfig } from "./getKSTableConfig.js";
import { clearTableContainer } from "./helpers/dom/clearTableContainer.js";
import { initVertical } from "./helpers/ks/vertical.js";
import { onSuccess } from "./helpers/ks/onSuccess.js";

const getLastQuotation = async () => {
    const fromFetch = await fetch("/api/v6/BillsTable/lastRecord")
    const data = await fromFetch.json();
    return data;
};

let jFLocalToInputhtmlId = (inValue) => {
    let jVarLocalHtmlId = 'htmlId';
    let jVarLocalhtmlId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalhtmlId === null === false) {
        jVarLocalhtmlId.innerHTML = inValue;
    };
};

const startFunc = async () => {
    getLastQuotation().then(res => {
        jFLocalToInputhtmlId(`last ${res.pk}`);
        // console.log(res);
    });

    const config = await getKSTableConfig();

    window.ksVertical = initVertical(config, onSuccess);

    clearTableContainer();
};

export default startFunc;