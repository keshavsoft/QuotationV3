// import { startFunc as createSaveButton } from "../../../../../../../../components/v18/saveButton/start.js";

const startFunc = ({ inOnSaveFunc }) => {
    const customEl = document.createElement("ks-save-button");
    customEl.onSave = inOnSaveFunc;

    return customEl;
};

const appendFooterSaveCell = ({ inOnSaveFunc }) => {
    // debugger
    if (!inOnSaveFunc) return;

    const td = document.createElement("td");
    td.className = "px-4 py-2 border";
    td.style.width = "100px";

    const customEl = document.createElement("ks-save-button");
    customEl.onSave = inOnSaveFunc;

    td.appendChild(customEl);
    // debugger
    return td;
};

export { appendFooterSaveCell };