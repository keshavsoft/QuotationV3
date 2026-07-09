# Proposal: Refactoring `appendFooterSaveCell.js` for Better Expressiveness

This document outlines a proposal to refactor the [appendFooterSaveCell.js](file:///d:/KeshavSoftRepos/2026-07-04/QuotationV3/Public/ks/table/v15/BuildTableVersions/V5/BuildFooterVersions/ForBoth/V2/CreateFooterRow/appendFooterSaveCell.js) module. The goal is to separate concerns, improve code readability, and match the design patterns used elsewhere in this directory (e.g., delegation patterns seen in `createFooterCell.js`).

---

## 1. Identified Concerns in Current Implementation

The current implementation of `appendFooterSaveCell` handles multiple responsibilities inside a single block:
1. **Cell Container Construction:** Creates the `<td>` element and applies style/class attributes.
2. **Button Component Creation:** Creates the `<button>` element and handles label/styling.
3. **Data Extraction:** Traverses the DOM from the clicked button up to the closest `<tfoot>`, queries all `<input>` elements, and reduces their names and values into a single data object.
4. **Callback Triggering:** Prevents default form action and calls the `inOnSaveFunc` function.

---

## 2. Proposed Modular Design

To match the pattern used in the neighboring directory (`CreateFooterInput/v2`), we will modularize the button creation into a dedicated subfolder: `SaveButton/v2/`.
This folder will contain:
1. **`createButton.js` (Component Creator):** Sole responsibility is to construct, label, and style the button DOM element, then return it.
2. **`attachClickListener.js` (Event Binder):** Responsible for attaching the click event listener, extracting the footer input values, and invoking the parent's `inOnSaveFunc` callback.
3. **`start.js` (Orchestrator):** Integrates the creator and the event binder, returning the finished button node.

The main wrapper file `appendFooterSaveCell.js` will import this orchestrator to fetch the configured button and append it.

---

## 3. Refactored Code Structure

### 3.1. [NEW] `SaveButton/v2/createButton.js`
Handles creation and visual styling of the button.

```javascript
const createButton = () => {
    const btn = document.createElement("button");
    btn.textContent = "Save";
    btn.className = "px-3 py-1 bg-green-500 text-white rounded";
    return btn;
};

export { createButton };
```

### 3.2. [NEW] `SaveButton/v2/attachClickListener.js`
Handles event attachment and data extraction from inputs.

```javascript
/**
 * Helper to query and extract all input names and values from the closest footer element.
 */
const extractFooterData = (currentTarget) => {
    const closestFooter = currentTarget.closest("tfoot");
    if (!closestFooter) return {};

    const inputs = closestFooter.querySelectorAll("input");
    const data = {};

    inputs.forEach((input) => {
        data[input.name] = input.value;
    });

    return data;
};

const attachClickListener = ({ htmlButtonElement, inOnSaveFunc }) => {
    htmlButtonElement.onclick = (e) => {
        e.preventDefault();
        
        const currentTarget = e.currentTarget;
        const data = extractFooterData(currentTarget);

        inOnSaveFunc({
            dataFromDom: data,
            inCurrentTarget: currentTarget,
        });
    };
};

export { attachClickListener };
```

### 3.3. [NEW] `SaveButton/v2/start.js`
Orchestrator that brings the element and the listener together.

```javascript
import { createButton } from "./createButton.js";
import { attachClickListener } from "./attachClickListener.js";

const startFunc = ({ inOnSaveFunc }) => {
    const btn = createButton();
    
    attachClickListener({
        htmlButtonElement: btn,
        inOnSaveFunc
    });

    return btn;
};

export { startFunc };
```

### 3.4. [MODIFY] `appendFooterSaveCell.js`
Main cell container wrapper that imports and uses the SaveButton orchestrator.

```javascript
import { startFunc as createSaveButton } from "./SaveButton/v2/start.js";

/**
 * Creates the footer save cell container and appends the Save button component.
 * 
 * @param {Object} params
 * @param {Function} params.inOnSaveFunc - Callback triggered with the collected form data
 * @returns {HTMLTableCellElement|undefined} The constructed cell element
 */
const appendFooterSaveCell = ({ inOnSaveFunc }) => {
    if (!inOnSaveFunc) return;

    // 1. Create table cell container
    const td = document.createElement("td");
    td.className = "px-4 py-2 border";
    td.style.width = "100px";

    // 2. Obtain the configured Save button component
    const btn = createSaveButton({ inOnSaveFunc });

    td.appendChild(btn);
    return td;
};

export { appendFooterSaveCell };
```

---

## 4. Key Benefits

1. **Perfect Consistency:** Mirror-images the existing pattern in `CreateFooterInput/v2/` where layout logic, data/events, and component instantiation are fully separated.
2. **Granular Separation of Concerns:** 
   * `createButton.js` only cares about style/structure.
   * `attachClickListener.js` only cares about context/behaviour.
   * `start.js` only cares about orchestration.
3. **Ease of Maintenance:** Styling changes are isolated to a single file, and listener execution context/parsing is isolated to another, leaving the container cell code completely clean.
