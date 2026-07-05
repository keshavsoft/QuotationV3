import getOptions from "./getOptions.js";
import applyStyle from "./applyStyle.js";
import createEditButton from "./Buttons/createEditButton/index.js";
import createDeleteButton from "./Buttons/createDeleteButton/index.js";
import createUpdateButton from "./Buttons/createUpdateButton.js";
import createCancelButton from "./Buttons/createCancelButton/index.js";
import hookEvents from "./events/index.js";
import render from "./render.js";

class KsTableBodyOptionsCell extends HTMLElement {
    connectedCallback() {
        const localOptions = getOptions({ inElement: this });

        applyStyle({ inElement: this });

        const editBtn = localOptions.showEdit ? createEditButton() : null;
        const deleteBtn = localOptions.showDelete ? createDeleteButton(localOptions) : null;
        const updateBtn = createUpdateButton();
        const cancelBtn = createCancelButton();

        hookEvents({
            editBtn,
            deleteBtn,
            updateBtn,
            cancelBtn,
            options: localOptions,
            inElement: this
        });

        render({
            inElement: this,
            editBtn,
            deleteBtn,
            updateBtn,
            cancelBtn
        });
    }
}

if (!customElements.get("ks-table-body-options-cell")) {
    customElements.define("ks-table-body-options-cell", KsTableBodyOptionsCell);
}

export { KsTableBodyOptionsCell };
