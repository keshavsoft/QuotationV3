# Implementation Plan: Vertical Table Component v3 (Inputs Only)

We are updating the `vertical/table/v3/` component to output the footer row (`<tr>`) containing only the input fields, completely excluding any button logic/dependencies (Save/Update/Cancel). This ensures the function is robust and won't fail even if action services/configs are not yet provided.

## Proposed Code Changes

### 1. Update `vertical/table/v3/index.js`
We will:
* Remove all button component imports (`createSaveButton`, etc.).
* Enforce robust optional chaining and fallbacks on the `options` parameter.
* Exclude any button generation from the actions cell (`tdActions`), leaving it as a placeholder to keep layout column alignment.
* Expose `createTfootRow` globally on `window.createTfootRow`.

#### Code:
```javascript
import createInputRows from "../../../commonInputBuilder/createInputRows.js";

/**
 * Creates and returns a table footer <tr> element containing inputs.
 *
 * @param {Object} options - Configuration and options data.
 * @param {Object} inputs - Reference object where generated input components will be stored.
 * @param {Object} [inServices] - (Ignored in v3) Services used by action buttons.
 * @param {Object} [inConfig] - (Ignored in v3) Table config.
 * @param {HTMLElement} [element] - (Ignored in v3) Optional parent element context.
 * @returns {HTMLTableRowElement} The created footer <tr> row.
 */
export const createTfootRow = ({ options, inputs, inServices, inConfig, element }) => {
    const {
        showSaveButton = false,
        inDefaultRow = {},
        inSearchableColumnsConfig = [],
        inDataStore,
        inVerticalOptions
    } = options || {};

    // Build the input rows into the shared inputs mapping object
    createInputRows({
        inSearchableColumnsConfig,
        inDefaultRow,
        inDataStore,
        inputs
    });

    const showSerial = options?.table?.showSerial ?? true;
    const showActions = options?.table?.showActions ?? true;

    // Create the footer <tr> element
    const footerRow = document.createElement("tr");
    footerRow.className = "bg-yellow-50/50 border-t border-gray-200";

    // 1. Serial column spacer
    if (showSerial) {
        const tdSerial = document.createElement("td");
        tdSerial.className = "px-4 py-3 text-sm text-gray-500 font-medium text-center w-12";
        footerRow.appendChild(tdSerial);
    }

    // 2. Input cells mapping
    inSearchableColumnsConfig.forEach(col => {
        const td = document.createElement("td");
        td.className = "px-4 py-2 align-middle";

        const inputComp = inputs[col.columnName];
        if (inputComp) {
            inputComp.className = "w-full";
            td.appendChild(inputComp);
        }
        footerRow.appendChild(td);
    });

    // 3. Actions column placeholder (no buttons as requested)
    if (showActions) {
        const tdActions = document.createElement("td");
        tdActions.className = "px-4 py-2 align-middle w-24";
        footerRow.appendChild(tdActions);
    }

    return footerRow;
};

window.createTfootRow = createTfootRow;

export default createTfootRow;
```

### 2. Cleanup `v3/Buttons/`
We will delete the unused `Buttons` directory under `vertical/table/v3/` since it is no longer referenced.

---

*I will proceed with applying these changes.*
