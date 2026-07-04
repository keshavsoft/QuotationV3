const updateClick = ({ event, options }) => {
    const updateBtn = event.currentTarget;
    const actionsCell = updateBtn.parentElement;
    const closestTr = updateBtn.closest("tr");
    if (!closestTr || !actionsCell) return;

    const editBtn = actionsCell.querySelector("button.editButton");
    const deleteBtn = actionsCell.querySelector("button.deleteButton");
    const cancelBtn = actionsCell.querySelector("button.cancelButton");

    const tds = closestTr.querySelectorAll("td");

    // Gather values and commit to static text
    tds.forEach((td, i) => {
        if (i === tds.length - 1) return;

        const input = td.querySelector("ks-table-footer-input, ks-input, input");
        if (input) {
            const nativeInput = input.querySelector("input") || input;
            const newVal = nativeInput.value || "";
            td.replaceChildren(document.createTextNode(newVal));
        }
    });

    // Toggle visibilities
    updateBtn.style.display = "none";
    if (cancelBtn) cancelBtn.style.display = "none";
    if (editBtn) editBtn.style.display = "";
    if (deleteBtn) deleteBtn.style.display = "";
};

export default updateClick;
