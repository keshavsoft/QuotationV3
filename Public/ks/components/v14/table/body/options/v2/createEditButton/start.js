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
const startFunc = ({ event, item, index, onEditFunc }) => {
    const editBtn = event.currentTarget;
    const actionsCell = editBtn.parentElement;
    const closestTable = editBtn.closest("table");
    const closestTr = editBtn.closest("tr");

    onEditFunc?.({ item, index, presentPk: item?.pk });
};

const startFunc1 = ({ event, item, index, onEditFunc }) => {
    const editBtn = event.currentTarget;
    const actionsCell = editBtn.parentElement;
    const closestTable = editBtn.closest("table");
    const closestTr = editBtn.closest("tr");

    if (!closestTable || !closestTr || !actionsCell) return;

    // 1. Hide Edit and Delete buttons
    const deleteBtn = Array.from(actionsCell.querySelectorAll("button")).find(btn => btn !== editBtn);
    editBtn.style.display = "none";
    if (deleteBtn) deleteBtn.style.display = "none";

    // 2. Clone footer inputs and replace cell content (saving original state)
    const tds = closestTr.querySelectorAll("td");
    const footerTds = closestTable.querySelectorAll("tfoot tr td");

    const originalNodes = Array.from(tds).map(td => Array.from(td.childNodes));

    tds.forEach((td, i) => {
        replaceCellWithFooterInput(td, footerTds[i], item);
    });

    // 3. Create and show Update and Cancel buttons
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "px-2 py-1 bg-green-500 text-white rounded mr-2";

    // Update handler
    updateBtn.onclick = () => {
        // Gather new values from inputs in row cells
        const updatedItem = { ...item };
        tds.forEach((td, i) => {
            const input = td.querySelector("ks-table-footer-input, ks-input, input");
            if (input) {
                const fieldName = input.getAttribute("ksname") ||
                    input.getAttribute("source") ||
                    input.getAttribute("name") ||
                    input.ksName;

                const nativeInput = input.querySelector("input") || input;
                if (fieldName && nativeInput) {
                    updatedItem[fieldName] = nativeInput.value;
                }
            }
        });

        console.log("Updated Row Data: ", updatedItem);

        // Clean up buttons and revert row cells back to updated static text
        tds.forEach((td, i) => {
            const childNode = originalNodes[i][0];
            if (childNode && childNode.nodeType === Node.TEXT_NODE) {
                const footerInput = footerTds[i]?.querySelector("ks-table-footer-input, ks-input, input");
                const fieldName = footerInput?.getAttribute("ksname") || footerInput?.getAttribute("name") || footerInput?.ksName;
                if (fieldName && updatedItem[fieldName] !== undefined) {
                    childNode.textContent = updatedItem[fieldName];
                }
            }
            td.replaceChildren(...originalNodes[i]);
        });

        updateBtn.remove();
        cancelBtn.remove();
        editBtn.style.display = "";
        if (deleteBtn) deleteBtn.style.display = "";
    };

    actionsCell.appendChild(updateBtn);

    onEditFunc?.({ item, index, presentPk: item?.pk });
};
export default startFunc;
