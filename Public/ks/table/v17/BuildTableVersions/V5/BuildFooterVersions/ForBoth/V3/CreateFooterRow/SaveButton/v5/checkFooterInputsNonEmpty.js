import isFocusableInput from "./isFocusableInput.js";
import isRequiredInput from "./isRequiredInput.js";
import resetCustomValidity from "./resetCustomValidity.js";
import findFirstEmptyInput from "./findFirstEmptyInput.js";
import reportInvalidInput from "./reportInvalidInput.js";

const startFunc = ({ inTableFooter }) => {
    if (!inTableFooter) return true;

    const allInputs = Array.from(inTableFooter.querySelectorAll("input"));
    const focusableInputs = allInputs.filter(isFocusableInput);
    const requiredInputs = focusableInputs.filter(isRequiredInput);

    resetCustomValidity(requiredInputs);

    const emptyInput = findFirstEmptyInput(requiredInputs);
    if (emptyInput) {
        reportInvalidInput(emptyInput);
        return false;
    }

    return true;
};

export default startFunc;
