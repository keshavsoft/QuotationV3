import readTableBodyAttributes from "./helpers/readTableBodyAttributes.js";
import initHandlers from "./helpers/initHandlers.js";
import renderRows from "./helpers/renderRows.js";

/**
 * Orchestrates the rendering and handler initialization of the table body.
 */
const buildBody = ({
    inVisibleColumnsConfig,
    inTableBody,
    inData,
    inServices,
    inEndPoints,
    inDataStore,
    inConfig,
    inTableFooter
}) => {
    const tableBody = inTableBody;
    tableBody.innerHTML = '';

    // 1. Read table body parameters and options from attributes
    const attributes = readTableBodyAttributes(tableBody);

    // 2. Initialize active event handlers (Delete, Edit, Update)
    const handlers = initHandlers({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        showSerial: attributes.showSerial,
        tableBody,
        inTableFooter
    });

    // 3. Render and append rows to the table body
    renderRows({
        tableBody,
        dataToShow: inData,
        inVisibleColumnsConfig,
        showSerial: attributes.showSerial,
        showActions: attributes.showActions,
        showEdit: attributes.showEdit,
        showDelete: attributes.showDelete,
        deleteType: attributes.deleteType,
        deleteIconSize: attributes.deleteIconSize,
        handlers
    });
};

export default buildBody;