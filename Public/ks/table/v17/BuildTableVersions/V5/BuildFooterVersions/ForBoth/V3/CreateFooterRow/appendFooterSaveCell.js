import { startFunc as createSaveButton } from "./SaveButton/v6/start.js";

const appendFooterSaveCell = ({ inOnSaveFunc }) => {
    // debugger
    if (!inOnSaveFunc) return;

    const td = document.createElement("td");
    td.className = "px-4 py-2 border";
    td.style.width = "100px";

    const btn = createSaveButton({ inOnSaveFunc });

    td.appendChild(btn);
    // debugger
    return td;
};

export { appendFooterSaveCell };