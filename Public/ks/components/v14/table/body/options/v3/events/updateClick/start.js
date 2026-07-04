/**
 * Start function for Update button click.
 * Gathers updated values from input elements into a data object,
 * reverts inputs to static text with the new values, and toggles buttons.
 */
const startFunc = ({ event, options }) => {
    const updateBtn = event.currentTarget;
    const actionsCell = updateBtn.parentElement;
    const closestTr = updateBtn.closest("tr");
    if (!closestTr || !actionsCell) return;

    const editBtn = actionsCell.querySelector("button.editButton");
    const deleteBtn = actionsCell.querySelector("button.deleteButton");
    const cancelBtn = actionsCell.querySelector("button.cancelButton");

    const tds = closestTr.querySelectorAll("td");

    // Gather values from inputs in row cells to construct an object
    const updatedItem = { pk: closestTr.dataset.pk || options.item?.pk };
    tds.forEach((td, i) => {
        if (i === tds.length - 1) return;

        const input = td.querySelector("input");
        if (input && input.name) {
            updatedItem[input.name] = input.value;
        }
    });

    console.log("Updated Row Data Object: ", updatedItem);

    // Revert cells to static text displaying the new values
    tds.forEach((td, i) => {
        if (i === tds.length - 1) return;

        const input = td.querySelector("input");
        if (input) {
            td.replaceChildren(document.createTextNode(input.value || ""));
        }
    });

    // Toggle button visibilities
    updateBtn.style.display = "none";
    if (cancelBtn) cancelBtn.style.display = "none";
    if (editBtn) editBtn.style.display = "";
    if (deleteBtn) deleteBtn.style.display = "";
};

export default startFunc;
