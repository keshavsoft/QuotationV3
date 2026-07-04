import { createInputRow } from "./createInputRow.js";

const createInputRows = ({ inColumnsConfig, inDefaultRow, inDataStore, inputs }) => {
    const fragment = document.createDocumentFragment();

    inColumnsConfig.forEach(col => {
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
