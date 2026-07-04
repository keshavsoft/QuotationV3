import { buildRow } from "./buildRow.js";
import buildDeleteHandler from "./handlerFuncs/V9/buildDeleteHandler.js";
import buildAlterHandler from "./handlerFuncs/V9/buildAlterHandler.js";
import buildUpdateHandler from "./handlerFuncs/V9/buildUpdateHandler.js";

const buildBody = ({ inVisibleColumnsConfig, inTableBody, inData,
    inServices, inEndPoints, inDataStore, inConfig, inTableFooter
}) => {

    const dataToShow = inData;
    const tableBody = inTableBody;

    const oldShowActions = tableBody.getAttribute("ks-showActions");
    const oldShowSerial = tableBody.getAttribute("ks-showSerial");
    const showEdit = tableBody.getAttribute("ks-showEdit");
    const showDelete = tableBody.getAttribute("ks-showDelete");
    const deleteType = tableBody.getAttribute("ks-deleteType");
    const deleteIconSize = tableBody.getAttribute("ks-deleteIconSize");

    tableBody.innerHTML = '';
    // tableBody.setAttribute("ks-showActions", inShowActions);

    const deleteFunc = buildDeleteHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: oldShowSerial,
        inTableBody: tableBody, inTableFooter
    });

    const editFunc = buildAlterHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: oldShowSerial,
        inTableBody: tableBody, inTableFooter
    });

    const updateFunc = buildUpdateHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: oldShowSerial,
        inTableBody: tableBody, inTableFooter
    });

    const handleDelete = ({ item, index, presentPk }) => {
        deleteFunc({ presentPk });
    };

    const handleEdit = ({ item, index, presentPk, updatedItem }) => {
        editFunc({ item, index, presentPk, updatedItem });
    };

    const handleUpdate = ({ item, index, presentPk, updatedItem }) => {
        updateFunc({ item, index, presentPk, updatedItem });
    };

    // debugger;
    dataToShow.forEach((item, index) => {
        const row = buildRow({
            item, index, inVisibleColumnsConfig,
            inShowSerial: oldShowSerial === "true",
            inShowActions: oldShowActions === "true",
            onDeleteFunc: handleDelete,
            onEditFunc: handleEdit,
            onUpdate: handleUpdate,
            inShowEdit: showEdit,
            inShowDelete: showDelete,
            inDeleteType: deleteType,
            inDeleteIconSize: deleteIconSize
        });

        tableBody.appendChild(row);
    });
};

export default buildBody;