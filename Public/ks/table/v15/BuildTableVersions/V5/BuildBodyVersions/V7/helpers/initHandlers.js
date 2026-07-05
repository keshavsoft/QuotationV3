import buildDeleteHandler from "../handlerFuncs/V10/buildDeleteHandler.js";
import buildAlterHandler from "../handlerFuncs/V10/buildAlterHandler.js";
import buildUpdateHandler from "../handlerFuncs/V10/buildUpdateHandler.js";
import buildShowHandler from "../handlerFuncs/V10/buildShowHandler.js";

const initHandlers = ({
    inServices, inEndPoints, inConfig, inDataStore,
    inVisibleColumnsConfig, showSerial, tableBody, inTableFooter
}) => {
    const deleteFunc = buildDeleteHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: showSerial,
        inTableBody: tableBody,
        inTableFooter
    });

    const editFunc = buildAlterHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: showSerial,
        inTableBody: tableBody,
        inTableFooter
    });

    const updateFunc = buildUpdateHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: showSerial,
        inTableBody: tableBody,
        inTableFooter
    });

    const showFunc = buildShowHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: showSerial,
        inTableBody: tableBody,
        inTableFooter,
        inCallBack: inConfig.callbacks.table.body.show
    });

    return {
        onDelete: ({ presentPk }) => deleteFunc({ presentPk }),
        onEdit: ({ item, index, presentPk, updatedItem }) => editFunc({ item, index, presentPk, updatedItem }),
        onUpdate: ({ item, index, presentPk, updatedItem }) => updateFunc({ item, index, presentPk, updatedItem }),
        onShow: ({ item, index, presentPk, updatedItem }) => showFunc({ item, index, presentPk, updatedItem }),
    };
};

export default initHandlers;
