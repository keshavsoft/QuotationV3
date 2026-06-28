const appendFooterSaveCell = ({ inOnSaveFunc, inVisibleColumnsConfig }) => {
    // debugger
    if (!inOnSaveFunc) return;

    const td = document.createElement("td");
    td.className = "px-4 py-2 border";
    td.style.width = "100px";

    const btn = document.createElement("button");
    btn.textContent = "Save";
    btn.className = "px-3 py-1 bg-green-500 text-white rounded";

    btn.onclick = (e) => {
        e.preventDefault(); // 🔥 THIS IS THE KEY
        // debugger;
        const currentTarget = e.currentTarget;
        const closestFooter = currentTarget.closest("tfoot");
        const inputs = closestFooter.querySelectorAll("input");
        
        let isValid = true;
        for (const input of inputs) {
            const col = inVisibleColumnsConfig?.find(c => c.columnName === input.name);
            if (col?.isRequired) {
                input.required = true;
            }

            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
                break;
            }
        }

        if (!isValid) return;

        const data = {};

        inputs.forEach((input) => {
            data[input.name] = input.value;
        });

        inOnSaveFunc({
            dataFromDom: data, inCurrentTarget: currentTarget,
        });
    };

    td.appendChild(btn);
    // debugger
    return td;
};

export { appendFooterSaveCell };