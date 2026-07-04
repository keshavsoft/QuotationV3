import { replaceCellWithFooterInput } from "./createEditButton/start.js";

const hookEvents = ({ editBtn, deleteBtn, updateBtn, cancelBtn, options, inElement }) => {
    const { item, index, onEditFunc } = options;

    if (!editBtn || !updateBtn || !cancelBtn) return;

    let originalNodes = null;

    editBtn.onclick = () => {
        const closestTr = inElement.closest("tr");
        const closestTable = inElement.closest("table");
        if (!closestTr || !closestTable) return;

        editBtn.style.display = "none";
        if (deleteBtn) deleteBtn.style.display = "none";

        updateBtn.style.display = "";
        cancelBtn.style.display = "";

        const tds = closestTr.querySelectorAll("td");
        const footerTds = closestTable.querySelectorAll("tfoot tr td");

        originalNodes = Array.from(tds).map((td, i) => {
            if (i === tds.length - 1) return null;
            return Array.from(td.childNodes);
        });

        tds.forEach((td, i) => {
            if (i === tds.length - 1) return;
            replaceCellWithFooterInput(td, footerTds[i], item);
        });

        onEditFunc?.({ item, index, presentPk: item?.pk });
    };

    cancelBtn.onclick = () => {
        const closestTr = inElement.closest("tr");
        if (!closestTr || !originalNodes) return;

        const tds = closestTr.querySelectorAll("td");
        tds.forEach((td, i) => {
            if (i === tds.length - 1) return;
            td.replaceChildren(...originalNodes[i]);
        });

        updateBtn.style.display = "none";
        cancelBtn.style.display = "none";

        editBtn.style.display = "";
        if (deleteBtn) deleteBtn.style.display = "";
    };

    updateBtn.onclick = () => {
        const closestTr = inElement.closest("tr");
        const closestTable = inElement.closest("table");
        if (!closestTr || !closestTable || !originalNodes) return;

        const tds = closestTr.querySelectorAll("td");
        const footerTds = closestTable.querySelectorAll("tfoot tr td");

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

        tds.forEach((td, i) => {
            if (i === tds.length - 1) return;
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

        updateBtn.style.display = "none";
        cancelBtn.style.display = "none";

        editBtn.style.display = "";
        if (deleteBtn) deleteBtn.style.display = "";
    };
};

export default hookEvents;
