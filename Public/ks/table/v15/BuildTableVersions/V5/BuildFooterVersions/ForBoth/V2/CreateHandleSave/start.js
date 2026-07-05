import { saveFooterRow } from "../saveFooterRow.js";

const startFunc = async ({ inServices, inEndPoints, inPayload, inDataStore, inTableBody,
    inVisibleColumnsConfig, inShowSerial, inShowActions, inCurrentTarget,
    inTableFooter, canSave, callbacks
}) => {

    await saveFooterRow({
        inServices, inEndPoints, inPayload, inDataStore, inTableBody,
        inVisibleColumnsConfig, inShowSerial, inShowActions, inCurrentTarget,
        inTableFooter, canSave, callbacks
    });
};

export { startFunc };