# Roadmap: Moving Input Rows Creation to a Common Shared Space

This roadmap outlines the steps to extract the inputs-creation logic from the `htmlForm` component folder to a sibling/common folder so that both `KsHtmlForm` and a table `tfoot` can consume it.

## Steps

### Step 1: Create a Common Sibling Module
We will create a new common utility/sibling directory at:
`Public/ks/components/v13/commonInputBuilder/`

Inside it, we will define:
* **`createInputRows.js`**: The core logic that loops through columns config, instantiates the custom elements (like `<ks-input>` or `<ks-datalist-input>`), and returns a `DocumentFragment`.

```
Public/ks/components/v13/
├── commonInputBuilder/
│   └── createInputRows.js   <-- New Shared Utility
├── vertical/
│   └── htmlForm/v9/         <-- HTML Form Component (Imports from commonInputBuilder)
└── tableFooter/             <-- Table tfoot Component (Imports from commonInputBuilder)
```

---

### Step 2: Extract `createInputRow.js` logic
We will move the creation logic from `vertical/htmlForm/v9/createInputRow.js` to the shared sibling `commonInputBuilder/createInputRows.js`, adjusting import paths relative to the new common folder.

---

### Step 3: Update `vertical/htmlForm/v9/` to Consume the Common Utility
We will remove `appendInputRows.js` and `createInputRow.js` from `vertical/htmlForm/v9/render/` entirely.
Instead, `vertical/htmlForm/v9/render/start.js` will directly import `createInputRows` from the common sibling:

```javascript
import createInputRows from "../../../commonInputBuilder/createInputRows.js";
```

---

### Step 4: Consume Common Utility in Table Footer (`tfoot`)
When building the table's `tfoot` row:
* Import `createInputRows` from `../../../commonInputBuilder/createInputRows.js`.
* Fetch the inputs fragment.
* Append the individual inputs to `<td>` cells instead of using vertical labels.

---

*This roadmap provides a clean separation of concerns, ensuring the inputs are configured once in a shared place and rendered flexibly depending on the layout requirement (Form vs. tfoot).*
