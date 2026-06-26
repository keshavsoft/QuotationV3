import { buildRow } from "./buildRow.js";
import buildDeleteHandler from "./handlerFuncs/V8/buildDeleteHandler.js";

const buildBody = ({ inVisibleColumnsConfig, inTableBody, inData,
    inServices, inEndPoints, inDataStore, inConfig, inTableFooter,
    inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
}) => {

    const dataToShow = inData;
    const tableBody = inTableBody;

    const oldShowActions = tableBody.getAttribute("ks-showActions");
    const oldShowSerial = tableBody.getAttribute("ks-showSerial");

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

    const handleDelete = ({ item, index, presentPk }) => {
        // console.log("aaaaaaa : ", item, index, presentPk);
        deleteFunc({ presentPk });
    };

    dataToShow.forEach((item, index) => {
        const row = buildRow({
            item, index, inVisibleColumnsConfig,
            inShowSerial: oldShowSerial === "true",
            inShowActions: oldShowActions === "true",
            onDeleteFunc: handleDelete,
            inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
        });

        tableBody.appendChild(row);
    });
};

export default buildBody;