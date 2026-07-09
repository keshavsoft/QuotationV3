const getClosestCustomElement = (element) => {
    let current = element.parentElement;
    while (current) {
        if (current.tagName && current.tagName.includes("-")) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
};

const isFocusableInput = (input) => {
    const type = input.type?.toLowerCase();
    const ignoredTypes = ["hidden", "button", "submit", "reset"];
    return !input.disabled && !input.readOnly && !ignoredTypes.includes(type);
};

const isRequiredInput = (input) => {
    const customElement = getClosestCustomElement(input);
    if (!customElement) return false;

    const isNotEmptyAttr = customElement.getAttribute("isnotempty");
    return isNotEmptyAttr && isNotEmptyAttr !== "undefined" && isNotEmptyAttr !== "false";
};

const resetCustomValidity = (inputs) => {
    inputs.forEach((input) => input.setCustomValidity(""));
};

const findFirstEmptyInput = (inputs) => {
    return inputs.find((input) => input.value.trim() === "");
};

const reportInvalidInput = (input) => {
    input.setCustomValidity("Please fill this field.");
    input.reportValidity();
    input.focus();
};

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
