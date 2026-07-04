# Design Update: `<td>`-Wrapped Table Layout in `createInputRows`

We are updating `createInputRows` to dynamically support two layout styles:
1. **`form` layout**: Returns the input components directly (to be appended to the form's `<fieldset>`).
2. **`table` layout**: Automatically wraps each input inside a `<td>` cell with Tailwind classes and returns the fragment of `<td>` cells (to be appended directly to the footer `<tr>`).

---

## Code Changes

### 1. Update `Public/ks/components/v13/commonInputBuilder/createInputRows.js`
We will introduce `inLayoutType` check:
* If `inLayoutType === "table"`, we wrap each input (`row`) in a `<td>` cell before adding it to the fragment.
* Otherwise, we append the input directly.

```javascript
import { createInputRow } from "./createInputRow.js";

const createInputRows = ({ inColumnsConfig, inDefaultRow, inDataStore, inputs, inLayoutType }) => {
    const fragment = document.createDocumentFragment();

    inColumnsConfig.forEach(col => {
        const row = createInputRow({
            inCol: col,
            inDefaultRow,
            inDataStore,
            inputs: inputs
        });
        if (row) {
            if (inLayoutType === "table") {
                const td = document.createElement("td");
                td.className = "px-4 py-2 align-middle";
                row.className = "w-full";
                td.appendChild(row);
                fragment.appendChild(td);
            } else {
                fragment.appendChild(row);
            }
        }
    });
    return fragment;
};

export default createInputRows;
```

---

### 2. Simplify `Public/ks/components/v13/vertical/table/v3/index.js`
Since `createInputRows` now returns the complete `<td>` cells package, the table footer builder logic simplifies to:

```javascript
export const createTfootRow = ({ options, inputs, inServices, inConfig, element }) => {
    const {
        showSaveButton = false,
        inDefaultRow = {},
        inColumnsConfig = [],
        inDataStore,
        inVerticalOptions
    } = options || {};

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

    // 2. Build and append td cells fragment directly
    const tdBundles = createInputRows({
        inColumnsConfig,
        inDefaultRow,
        inDataStore,
        inputs,
        inLayoutType: "table"
    });
    footerRow.appendChild(tdBundles);

    // 3. Actions column placeholder
    if (showActions) {
        const tdActions = document.createElement("td");
        tdActions.className = "px-4 py-2 align-middle w-24";
        footerRow.appendChild(tdActions);
    }

    return footerRow;
};
```

---

*I will proceed with implementing this updated layout logic.*
