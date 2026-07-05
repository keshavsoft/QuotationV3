import { saveFooterRow } from "../saveFooterRow.js";

const startFunc = async ({ inServices, inEndPoints, inPayload, inDataStore, inTableBody,
    inVisibleColumnsConfig, inShowSerial, inShowActions, inCurrentTarget,
    inTableFooter, canSave, callbacks, inConfig
}) => {

    await saveFooterRow({
        inServices, inEndPoints, inPayload, inDataStore, inTableBody,
        inVisibleColumnsConfig, inShowSerial, inShowActions, inCurrentTarget,
        inTableFooter, canSave, callbacks, inConfig
    });
};

export { startFunc };