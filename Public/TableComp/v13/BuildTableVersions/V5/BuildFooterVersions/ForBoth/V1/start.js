import { startFunc as createHandleSave } from "./CreateHandleSave/start.js";
import createHandleOnChange from "./CreateHandleOnChange/V2/start.js";

import { startFunc as createFooter } from "./CreateFooter/start.js";
import forSummary from "../../ForSummary/V8/CreateFooterRow/V4/start.js";

const buildFooter = ({ inVisibleColumnsConfig, inDefaultRow, keys,
    inTableFooter, inShowDataList, inDataStore, inShowSave, inOptions,
    inServices, inEndPoints, inTableBody, inShowSerial, inShowActions,
    inData, inShowFooterRows = false
}) => {

    const localVisibleColumns = inVisibleColumnsConfig

    const localHandleSave = ({ dataFromDom, inCurrentTarget }) => {
        const objectToSave = { ...dataFromDom, ...inDefaultRow };
        // debugger;
        createHandleSave({
            inServices, inEndPoints, inPayload: objectToSave,
            inDataStore, inTableBody,
            inVisibleColumnsConfig: localVisibleColumns,
            inShowSerial, inShowActions, inCurrentTarget,
            inTableFooter
        });
    };

    const localHandleOnChange = ({ inCurrentTarget, inChangeType }) => {
        createHandleOnChange({
            inDataStore,
            inColumnsConfig: localVisibleColumns,
            inToSaveRow: inDefaultRow,
            inCurrentTarget,
            inChangeType
        });
    };

    const localTr = createFooter({
        inVisibleColumnsConfig: localVisibleColumns,
        inDefaultRow, inShowDataList, keys,
        onChangeFunc: localHandleOnChange,
        inShowSave, inOnSaveFunc: localHandleSave,
        inShowSerial
    });

    inTableFooter.appendChild(localTr);
    // debugger;

    if (inShowFooterRows) {
        const forSummaryTr = forSummary({
            inVisibleColumnsConfig: localVisibleColumns,
            inThSerialClassName: "", inData,
            inShowTotals: true, inShowBalance: true,
            inShowSerial, inShowActions
        });
        // debugger;

        forSummaryTr.forEach(element => {
            inTableFooter.appendChild(element);
        });
    };
};

export default buildFooter;