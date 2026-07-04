# Implementation Plan: Modular Structuring of `createEditButton`

We will restructure the `createEditButton` implementation to align with the repository's established pattern (similar to `createDeleteButton`). 

The logic will be moved to a dedicated directory `/ks/components/v13/tableBodyOptionsCell/createEditButton/` and broken down into clean, modular sub-functions with clear documentation.

---

## Proposed Folder Structure

* `/ks/components/v13/tableBodyOptionsCell/createEditButton.js` (Entry redirect)
* `/ks/components/v13/tableBodyOptionsCell/createEditButton/index.js` (Assembler)
* `/ks/components/v13/tableBodyOptionsCell/createEditButton/setContent.js` (Button UI content)
* `/ks/components/v13/tableBodyOptionsCell/createEditButton/applyStyle.js` (Button CSS styling)
* `/ks/components/v13/tableBodyOptionsCell/createEditButton/attachClick.js` (Event attachment wrapper)
* `/ks/components/v13/tableBodyOptionsCell/createEditButton/start.js` (Core execution flow with detailed comments)

---

## Code Implementations

### 1. `createEditButton.js` (Entry)
```javascript
import createEditButton from "./createEditButton/index.js";
export default createEditButton;
```

### 2. `createEditButton/index.js`
```javascript
import setContent from "./setContent.js";
import applyStyle from "./applyStyle.js";
import attachClick from "./attachClick.js";

const createEditButton = ({ item, index, onEditFunc }) => {
    const editBtn = document.createElement("button");

    setContent({ inButton: editBtn });
    applyStyle({ inButton: editBtn });
    attachClick({ inButton: editBtn, item, index, onEditFunc });

    return editBtn;
};

export default createEditButton;
```

### 3. `createEditButton/setContent.js`
```javascript
const setContent = ({ inButton }) => {
    inButton.textContent = "Edit";
};
export default setContent;
```

### 4. `createEditButton/applyStyle.js`
```javascript
const applyStyle = ({ inButton }) => {
    inButton.className = "px-2 py-1 bg-yellow-400 text-white rounded";
};
export default applyStyle;
```

### 5. `createEditButton/attachClick.js`
```javascript
import startFunc from "./start.js";

const attachClick = ({ inButton, item, index, onEditFunc }) => {
    inButton.onclick = (event) => {
        startFunc({
            event,
            item,
            index,
            onEditFunc
        });
    };
};
export default attachClick;
```

### 6. `createEditButton/start.js`
This file contains the core logic decomposed into smaller helper functions, along with clear documentation explaining why we clone nodes and manually copy JavaScript properties (the Web Component/Custom Element gotcha).

```javascript
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
 */
const replaceCellWithFooterInput = (td, footerTd) => {
    if (!footerTd) return;
    
    // Find the input element (could be a custom element or a native input)
    const footerInput = footerTd.querySelector("ks-table-footer-input, ks-input, input");
    if (!footerInput) return;

    const clonedInput = cloneFooterInput(footerInput);
    td.replaceChildren(clonedInput);
};

/**
 * Main execution handler when the Edit button is clicked.
 * Loops through the row's tds and replaces each data cell with a cloned footer input.
 */
const startFunc = ({ event, item, index, onEditFunc }) => {
    const localCurrentTarget = event.currentTarget;
    const closestTable = localCurrentTarget.closest("table");
    const closestTr = localCurrentTarget.closest("tr");

    if (closestTable && closestTr) {
        const tds = closestTr.querySelectorAll("td");
        const footerTds = closestTable.querySelectorAll("tfoot tr td");

        tds.forEach((td, i) => {
            replaceCellWithFooterInput(td, footerTds[i]);
        });
    }

    onEditFunc?.({ item, index, presentPk: item?.pk });
};

export default startFunc;
```

---

*I will proceed with implementing this modular structure.*
