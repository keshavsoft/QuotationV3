const createInput = ({
    inType = "text",
    key, inDataStore,
    className, inputClassName,
    inOnKeyDown, inColumnsConfig, inOnChangeType,
    showDataList, inRightAlign,
    inWidth, inDataListSource, inDataListFillName,
    inFooterConfig
} = {}) => {
    let input = document.createElement("ks-table-footer-input");

    input.ksType = inType;
    input.ksPlaceholder = key;
    input.ksName = key;
    input.ksClassName = className;

    input.ksInputClassName = inputClassName;

    input.ksOnKeyDown = inOnKeyDown;
    input.ksShowDataList = showDataList;
    input.ksInColumnsConfig = inColumnsConfig;

    // input.ksOnChangeFunc = onChangeFunc;
    input.ksOnChangeType = inOnChangeType;

    input.ksRightAlign = inRightAlign;
    input.ksWidth = inWidth;
    input.dataStore = inDataStore;

    input.setAttribute("ksDataListSource", inDataListSource);
    input.setAttribute("ksDataListFillName", inDataListFillName);

    input.setAttribute("type", inType);

    if (inFooterConfig) {
        input.setAttribute("isNotEmpty", inFooterConfig?.isNotEmpty);
        input.setAttribute("onKeyDownType", inFooterConfig?.onKeyDownType);

        if ("enterAsTab" in inFooterConfig) input.setAttribute("enterAsTab", inFooterConfig.enterAsTab);

        if ("evalformula" in inFooterConfig) input.setAttribute("evalformula", inFooterConfig.evalformula);

        if ("evalToControl" in inFooterConfig) input.setAttribute("evalToControl", inFooterConfig.evalToControl);
    };

    return input;
};

export default createInput;
