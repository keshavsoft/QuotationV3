const getDeleteType = (el) => {
    if (el.ksDeleteType) return el.ksDeleteType;

    if (el.hasAttribute("ks-delete-type")) return el.getAttribute("ks-delete-type");
    if (el.hasAttribute("delete-type")) return el.getAttribute("delete-type");

    let parent = el.parentElement;
    while (parent) {
        if (parent.hasAttribute("ks-delete-type")) return parent.getAttribute("ks-delete-type");
        if (parent.hasAttribute("delete-type")) return parent.getAttribute("delete-type");
        parent = parent.parentElement;
    }

    return "both";
};

const getOptions = ({ inElement }) => {
    return {
        item: inElement.ksItem,
        index: inElement.ksIndex,
        onDeleteFunc: inElement.ksOnDeleteFunc,
        onEditFunc: inElement.ksOnEditFunc,
        deleteType: getDeleteType(inElement)
    };
};

export default getOptions;
