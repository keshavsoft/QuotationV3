import { createButton } from "./createButton.js";
import { attachClickListener } from "./attachClickListener.js";

const startFunc = ({ inOnSaveFunc }) => {
    const btn = createButton();

    attachClickListener({
        htmlButtonElement: btn,
        inOnSaveFunc
    });

    return btn;
};

export { startFunc };
