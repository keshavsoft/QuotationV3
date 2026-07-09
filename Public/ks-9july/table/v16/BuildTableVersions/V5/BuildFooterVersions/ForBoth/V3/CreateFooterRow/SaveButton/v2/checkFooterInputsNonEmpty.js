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

const startFunc = ({ inTableFooter }) => {
    if (!inTableFooter) return true;

    const localInputs = Array.from(inTableFooter.querySelectorAll("input"))
        .filter((input) => {
            const localInputType = input.type?.toLowerCase();

            return !input.disabled &&
                !input.readOnly &&
                !["hidden", "button", "submit", "reset"].includes(localInputType);
        });

    const localRequiredInputs = localInputs.filter((input) => {
        const customElement = getClosestCustomElement(input);
        if (!customElement) return false;

        const isNotEmptyAttr = customElement.getAttribute("isnotempty");
        return isNotEmptyAttr && isNotEmptyAttr !== "undefined" && isNotEmptyAttr !== "false";
    });

    localRequiredInputs.forEach((input) => input.setCustomValidity(""));

    const localEmptyInput = localRequiredInputs.find((input) => input.value.trim() === "");

    if (!localEmptyInput) return true;

    localEmptyInput.setCustomValidity("Please fill this field.");
    localEmptyInput.reportValidity();
    localEmptyInput.focus();

    return false;
};

export default startFunc;
