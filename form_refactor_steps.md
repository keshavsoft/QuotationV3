# Implementation Plan: Extracting Form Inputs to `commonInputBuilder`

We are refactoring the vertical form input creation logic by migrating the code to a shared sibling directory: `Public/ks/components/v13/commonInputBuilder/`.

## Proposed Steps and Code Changes

### Step 1: Create the Shared Files in `commonInputBuilder/`

We will write the following 4 files in `Public/ks/components/v13/commonInputBuilder/`:

#### 1. `commonInputBuilder/createInputRows.js`
```javascript
import { createInputRow } from "./createInputRow.js";

const createInputRows = ({ inSearchableColumnsConfig, inDefaultRow, inDataStore, inputs }) => {
    const fragment = document.createDocumentFragment();
    inSearchableColumnsConfig.forEach(col => {
        const row = createInputRow({
            inCol: col,
            inDefaultRow,
            inDataStore,
            inputs: inputs
        });
        if (row) {
            fragment.appendChild(row);
        }
    });
    return fragment;
};

export default createInputRows;
```

#### 2. `commonInputBuilder/createInputRow.js`
```javascript
import { createDataListInput } from "./createDataListInput.js";
import { createDefaultInput } from "./createDefaultInput.js";

export const createInputRow = ({ inCol, inDefaultRow, inDataStore, inputs }) => {
    const col = inCol.columnName;
    const dataListFillName = inCol.dataListFillName;

    let row;

    if ("verticalConfig" in inCol) {
        if ("dataListSource" in inCol) {
            row = createDataListInput({ inCol, inDefaultRow, inDataStore, inputs });
        } else {
            row = createDefaultInput({
                inCol,
                inDefaultRow,
                inDataStore,
                inDataListFillName: dataListFillName,
                inType: "type" in inCol ? inCol.type : "",
                inputs
            });
        }
    }

    return row;
};
```

#### 3. `commonInputBuilder/createDefaultInput.js`
```javascript
export const createDefaultInput = ({ inCol, inDefaultRow, inDataStore, inDataListFillName, inType, inputs }) => {
    const col = inCol.columnName;
    const row = document.createElement("ks-input");

    const defaultValue = col in inDefaultRow ? inDefaultRow[col] : "";

    row.setAttribute("label", inCol.title);
    row.setAttribute("ksName", col);
    row.setAttribute("source", col);

    if (inType !== undefined) {
        row.setAttribute("type", inType);
    };

    if (defaultValue) {
        row.setAttribute("ksInValue", defaultValue);
    };

    if (inCol?.verticalConfig) {
        if ("allowOnChange" in inCol.verticalConfig) {
            row.setAttribute("ksAllowOnChange", inCol.verticalConfig.allowOnChange);
        }
        if ("onKeyDownType" in inCol.verticalConfig) {
            row.setAttribute("ksOnKeyDownType", inCol.verticalConfig.onKeyDownType);
        }
    }

    if (inDataListFillName) {
        row.setAttribute("ksDataListFillName", inDataListFillName);
    }

    row.dataStore = inDataStore;
    inputs[col] = row;

    return row;
};
```

#### 4. `commonInputBuilder/createDataListInput.js`
```javascript
export const createDataListInput = ({ inCol, inDefaultRow, inDataStore, inputs }) => {
    const col = inCol.columnName;
    const row = document.createElement("ks-datalist-input");

    const defaultValue = col in inDefaultRow ? inDefaultRow[col] : "";
    row.setAttribute("label", inCol.title);
    row.setAttribute("ksName", col);
    row.setAttribute("list", `${col}List`);
    row.setAttribute("source", col);
    row.setAttribute("ksInValue", defaultValue);
    row.setAttribute("ksDataListSource", inCol.dataListSource);

    row.dataStore = inDataStore;
    inputs[col] = row;

    return row;
};
```

---

### Step 2: Update `vertical/htmlForm/v9/render/start.js`
Update the import path for `createInputRows` to point to the new location:

```javascript
import createInputRows from "../../../../commonInputBuilder/createInputRows.js";
```

---

### Step 3: Remove the old files
We will delete the old files from `vertical/htmlForm/v9/` to prevent confusion:
* `vertical/htmlForm/v9/render/appendInputRows.js`
* `vertical/htmlForm/v9/createInputRow.js`
* `vertical/htmlForm/v9/createDefaultInput.js`
* `vertical/htmlForm/v9/createDataListInput.js`

---

*I will proceed with applying these changes directly.*
