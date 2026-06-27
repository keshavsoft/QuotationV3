import setContent from "./setContent.js";
import applyStyle from "./applyStyle.js";
import attachClick from "./attachClick.js";

const createDeleteButton = ({ item, index, onDeleteFunc, deleteType }) => {
    const deleteBtn = document.createElement("button");

    setContent({
        inButton: deleteBtn,
        deleteType
    });

    applyStyle({ inButton: deleteBtn });

    attachClick({
        inButton: deleteBtn,
        item,
        index,
        onDeleteFunc
    });

    return deleteBtn;
};

export default createDeleteButton;
