import { getKSTableConfig } from "./getKSTableConfig.js";
import showByPk from "./showByPk.js";
import { clubData } from "./helpers/clubData.js";

const jFLocalToInputkSTableContainer = (inValue) => {
    const jVarLocalHtmlId = 'kSTableContainer';
    const jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    };
};

const startFunc = async () => {
    jFLocalToInputkSTableContainer("");

    const config = await getKSTableConfig();

    config.defaults.data = await clubData();

    if (config.callbacks) {
        if (config.callbacks.table.body.show) {
            config.callbacks.table.body.show = fromLibrary => {
                showByPk(fromLibrary.item.pk);
            };
        };

        if (config.callbacks.table.body.edit) {
            config.callbacks.table.body.edit = fromLibrary => {
                console.log("jjjjjjjj------ : ", fromLibrary);

                //showByPk(fromLibrary.item.pk);
            };
        };
    }

    const ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();
};

export default startFunc;