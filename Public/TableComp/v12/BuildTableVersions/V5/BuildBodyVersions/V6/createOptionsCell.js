class KsTableBodyOptionsCell extends HTMLElement {
    connectedCallback() {
        const item = this.ksItem;
        const index = this.ksIndex;
        const onDeleteFunc = this.ksOnDeleteFunc;
        const onEditFunc = this.ksOnEditFunc;

        this.className = "flex gap-2";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "px-2 py-1 bg-yellow-400 text-white rounded";
        editBtn.onclick = () => onEditFunc?.({ item, index, presentPk: item?.pk });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="inline w-4 h-4 mr-1">
  <path stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 7.5h12m-9 0V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5m-7.5 0v10.125A2.625 2.625 0 0010.125 20.25h3.75A2.625 2.625 0 0016.5 17.625V7.5M9.75 10.5v6m4.5-6v6" />
</svg>
Delete
`;
        deleteBtn.className = "px-2 py-1 bg-red-500 text-white rounded";
        deleteBtn.onclick = () => onDeleteFunc?.({ item, index, presentPk: item?.pk });

        this.appendChild(editBtn);
        this.appendChild(deleteBtn);
    }
}

if (!customElements.get("ks-table-body-options-cell")) {
    customElements.define("ks-table-body-options-cell", KsTableBodyOptionsCell);
}

const createOptionsCell = ({ item, index, onDeleteFunc, onEditFunc }) => {
    const td = document.createElement("td");
    td.className = "px-4 py-2 border";

    const ksTd = document.createElement("ks-table-body-options-cell");
    ksTd.ksItem = item;
    ksTd.ksIndex = index;
    ksTd.ksOnDeleteFunc = onDeleteFunc;
    ksTd.ksOnEditFunc = onEditFunc;

    td.appendChild(ksTd);

    return td;
};

export { createOptionsCell };