/**
 * Clones a custom element and copies custom JS properties.
 *
 * Gotcha: cloneNode(true) only copies standard HTML attributes/DOM structures.
 * It does NOT copy custom JS properties (like ksName, dataStore) assigned in memory.
 * We must copy them manually so the custom element's connectedCallback() runs correctly.
 *
 * @param {HTMLElement} footerInput - The source element to clone.
 * @returns {HTMLElement} The cloned element with properties copied.
 */
const cloneFooterInput = (footerInput) => {
    const clonedInput = footerInput.cloneNode(true);

    clonedInput.ksName = footerInput.ksName;
    clonedInput.dataStore = footerInput.dataStore;
    clonedInput.ksPlaceholder = footerInput.ksPlaceholder;
    clonedInput.ksClassName = footerInput.ksClassName;
    clonedInput.ksInputClassName = footerInput.ksInputClassName;
    clonedInput.ksOnKeyDown = footerInput.ksOnKeyDown;
    clonedInput.ksShowDataList = footerInput.ksShowDataList;
    clonedInput.ksInColumnsConfig = footerInput.ksInColumnsConfig;
    clonedInput.ksOnChangeType = footerInput.ksOnChangeType;
    clonedInput.ksRightAlign = footerInput.ksRightAlign;
    clonedInput.ksWidth = footerInput.ksWidth;

    return clonedInput;
};

/**
 * Replaces the content of a row td with a clone of the corresponding footer input element.
 *
 * @param {HTMLTableCellElement} td - The table row cell to replace.
 * @param {HTMLTableCellElement} footerTd - The matching table footer cell.
 * @param {Object} item - The current row data object.
 */
export const replaceCellWithFooterInput = (td, footerTd, item) => {
    if (!footerTd) return;

    // Find the input element (could be a custom element or a native input)
    const footerInput = footerTd.querySelector("ks-table-footer-input, ks-input, input");
    if (!footerInput) return;

    const clonedInput = cloneFooterInput(footerInput);

    // Set the initial value on the cloned input based on current row item data
    const fieldName = footerInput.getAttribute("ksname") ||
        footerInput.getAttribute("source") ||
        footerInput.getAttribute("name") ||
        footerInput.ksName;

    if (fieldName && item) {
        const val = item[fieldName] !== undefined ? item[fieldName] : "";
        clonedInput.setAttribute("ksInValue", val);
        clonedInput.setAttribute("value", val);
        clonedInput.value = val;
    }

    td.replaceChildren(clonedInput);
};

/**
 * Main execution handler when the Edit button is clicked.
 * Loops through the row's tds and replaces each data cell with a cloned footer input.
 * Hides Edit and Delete, then displays Update and Cancel buttons.
 */
const startFunc = ({ inCurrentTarget }) => {
    console.log("aaaaaaaaaaa : ", inCurrentTarget);


    const cancelBtn = event.currentTarget;
    const actionsCell = cancelBtn.parentElement;
    // const closestTable = editBtn.closest("table");
    // const closestTr = editBtn.closest("tr");

    const editButton = actionsCell.querySelector("button.editButton")
    editButton.style.display = "";

    const deleteButton = actionsCell.querySelector("button.deleteButton")
    deleteButton.style.display = "";

    cancelBtn.style.display = "none";




    // const cancelBtn = document.createElement("button");
    // cancelBtn.textContent = "Cancel";
    // cancelBtn.className = "px-2 py-1 bg-gray-500 text-white rounded";

    // Revert handler (Cancel)
    // cancelBtn.onclick = () => {
    //     // Revert cells to original text
    //     tds.forEach((td, i) => {
    //         td.replaceChildren(...originalNodes[i]);
    //     });

    //     // Remove new buttons
    //     updateBtn.remove();
    //     cancelBtn.remove();

    //     // Restore original buttons
    //     editBtn.style.display = "";
    //     if (deleteBtn) deleteBtn.style.display = "";
    // };



};

export default startFunc;
