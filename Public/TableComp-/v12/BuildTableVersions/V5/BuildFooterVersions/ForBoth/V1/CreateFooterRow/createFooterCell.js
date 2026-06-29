import createFooterInput from "./CreateFooterInput/v2/start.js";

const createFooterCell = ({ key, onChangeFunc, showDataList, inColumnsConfig,
    inDefaultValue, inTdClass, inAllowOnChange = false, inOnChangeType,
    inOnKeyDown, inOnKeyDownType, inDefaultRow }) => {

    let localChangeFunc;

    const td = document.createElement("td");
    td.className = inTdClass;

    if (inAllowOnChange) {
        localChangeFunc = onChangeFunc;
    };

    const input = createFooterInput({
        key, onChangeFunc: localChangeFunc, inOnKeyDown, inOnKeyDownType,
        showDataList, inColumnsConfig, inDefaultValue, inOnChangeType,
        inDefaultRow
    });

    const div = document.createElement("div");
    div.className = "calc-message";

    td.appendChild(input);
    td.appendChild(div);

    return td;
};

export { createFooterCell };