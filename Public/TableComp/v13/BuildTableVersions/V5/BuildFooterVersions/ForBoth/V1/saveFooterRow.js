// import { validateRow } from "./Utils/validateRow.js";

// import { getFooterPayload } from "./getFooterPayload.js";
// import { showErrors } from "./DomManipulation/showErrors.js";
// import { clearErrors } from "./DomManipulation/clearErrors.js";
// import { clearFooterInputs } from "./DomManipulation/clearFooterInputs.js";

// import { buildBody } from "../../../BuildBodyVersions/V4/start.js";

import afterMutation from "../../../AfterMutation/V5/index.js";

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
        const fromSave = await inServices.actions.createNoRepsonse({
            inEndPoint: inEndPoints.create,
            payload: inPayload
        });

        if (fromSave.ok) {
            // console.log("ssssssssss");

            afterMutation({
                inDataStore, inServices, inEndPoints,
                inTableBody, inVisibleColumnsConfig,
                inShowSerial, inShowActions, inTableFooter,
                inIsUpdateFooter: true
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