const createEditButton = ({ item, index, onEditFunc }) => {
    // console.log("onEditFunc : ", onEditFunc);

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.className = "px-2 py-1 bg-yellow-400 text-white rounded";
    editBtn.onclick = (event) => {
        const localCurrentTarget = event.currentTarget;
        const closestTable = localCurrentTarget.closest("table");
        const closestTr = localCurrentTarget.closest("tr");

        if (closestTable && closestTr) {
            const tds = closestTr.querySelectorAll("td");
            const footerTds = closestTable.querySelectorAll("tfoot tr td");

            tds.forEach((td, i) => {
                const footerTd = footerTds[i];
                if (footerTd) {
                    const footerInput = footerTd.querySelector("ks-table-footer-input, ks-input, input");
                    if (footerInput) {
                        // Clone the input element from the footer
                        const clonedInput = footerInput.cloneNode(true);
                        
                        // Copy JS properties that cloneNode does not copy
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

                        td.replaceChildren(clonedInput);
                    }
                }
            });
        }

        onEditFunc?.({ item, index, presentPk: item?.pk });
    };

    return editBtn;
};

export default createEditButton;
