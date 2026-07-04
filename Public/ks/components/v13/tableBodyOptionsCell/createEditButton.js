const createEditButton = ({ item, index, onEditFunc }) => {
    // console.log("onEditFunc : ", onEditFunc);

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.className = "px-2 py-1 bg-yellow-400 text-white rounded";
    editBtn.onclick = (event) => {
        const localCurrentTarget = event.currentTarget;
        const closestTable = localCurrentTarget.closest("table");
        const footerInputs = closestTable.querySelectorAll("tfoot tr input");

        console.log("sssssssssssssss", footerInputs);

        onEditFunc?.({ item, index, presentPk: item?.pk });
    };

    return editBtn;
};

export default createEditButton;
