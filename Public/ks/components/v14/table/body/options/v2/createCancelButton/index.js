import setContent from "./setContent.js";
import applyStyle from "./applyStyle.js";
import attachClick from "./attachClick.js";

const createEditButton = () => {
    const editBtn = document.createElement("button");

    setContent({ inButton: editBtn });
    applyStyle({ inButton: editBtn });
    attachClick({ inButton: editBtn });

    return editBtn;
};

export default createEditButton;
