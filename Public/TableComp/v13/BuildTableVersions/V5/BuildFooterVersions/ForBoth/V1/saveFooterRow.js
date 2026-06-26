// import { validateRow } from "./Utils/validateRow.js";

// import { getFooterPayload } from "./getFooterPayload.js";
// import { showErrors } from "./DomManipulation/showErrors.js";
// import { clearErrors } from "./DomManipulation/clearErrors.js";
// import { clearFooterInputs } from "./DomManipulation/clearFooterInputs.js";

// import { buildBody } from "../../../BuildBodyVersions/V4/start.js";

import afterMutation from "../../../AfterMutation/V4/index.js";

const saveFooterRow = async ({
    inDataStore,
    inDom,
    inServices,
    inEndPoints,
    inContainerEl,
    inOptions,
    inColumnsConfig,
    inVisibleColumnsConfig,
    inShowActions,
    inShowSerial,
    inShowTable,
    inToSaveRow,
    tableOptions,
    inPayload,
    inTableBody,
    clearFooter = true,
    inCurrentTarget,
    inTableFooter
}) => {
    try {
        // console.log("bbbbbb : ", inDataStore);


        // debugger
        const fromSave = await inServices.actions.createNoRepsonse({
            inEndPoint: inEndPoints.create,
            payload: inPayload
        });

        if (fromSave.ok) {
            afterMutation({
                inDataStore, inServices, inEndPoints,
                inTableBody, inVisibleColumnsConfig,
                inShowSerial, inShowActions, inTableFooter
            });

        };
    } catch (err) {
        console.error(err);
        return;
    };

    // const closestTfoot = inCurrentTarget.closest(".tfootClass");

    // if (clearFooter) clearFooterInputs({ inTFoot: closestTfoot });

    // focusFooter({ inTFoot: closestTfoot });
};

const focusFooter = ({ inTFoot }) => {
    const el = inTFoot.querySelector(
        "tfoot input, tfoot select, tfoot textarea"
    );
    el?.focus();
};

export { saveFooterRow };