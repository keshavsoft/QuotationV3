import { buildRow } from "./buildRow.js";
import buildDeleteHandler from "./handlerFuncs/V8/buildDeleteHandler.js";

const buildBody = ({ inVisibleColumnsConfig, inTableBody, inData,
    inServices, inEndPoints, inDataStore, inConfig, inTableFooter
}) => {

    const dataToShow = inData;
    const tableBody = inTableBody;

    const oldShowActions = tableBody.getAttribute("ks-showActions");
    const oldShowSerial = tableBody.getAttribute("ks-showSerial");

    tableBody.innerHTML = '';
    // tableBody.setAttribute("ks-showActions", inShowActions);

    const handleDelete = buildDeleteHandler({
        inServices,
        inEndPoints,
        inConfig,
        inDataStore,
        inVisibleColumnsConfig,
        inShowSerial: oldShowSerial,
        inTableBody: tableBody, inTableFooter
    });

    dataToShow.forEach((item, index) => {
        const row = buildRow({
            item, index, inVisibleColumnsConfig,
            inShowSerial: oldShowSerial === "true",
            inShowActions: oldShowActions === "true",
            onDeleteFunc: handleDelete
        });

        tableBody.appendChild(row);
    });
};

export default buildBody;