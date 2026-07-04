const createTd = ({ inValue, inRightAlign, inWidth, inSearchValue,
    inEnterAsTab, inEvalformula, inEvalToControl, inOnKeyDownType
}) => {
    const td = document.createElement("td");

    td.className = "px-4 py-2 border";

    // const ksTd = document.createElement("ks-table-body-cell");
    // ksTd.ksValue = inValue;
    // ksTd.ksRightAlign = inRightAlign;
    // ksTd.ksWidth = inWidth;
    // ksTd.ksSearchValue = inSearchValue;

    // const k1 = document.createElement("ks-table-body-cell");
    let footerInput = document.createElement("ks-table-footer-input");

    if (inOnKeyDownType) footerInput.setAttribute("onKeyDownType", inOnKeyDownType);

    if (inEnterAsTab) footerInput.setAttribute("enterAsTab", inEnterAsTab);

    if (inEvalformula) footerInput.setAttribute("evalformula", inEvalformula);

    if (inEvalToControl) footerInput.setAttribute("evalToControl", inEvalToControl);

    td.appendChild(footerInput);

    return td;

};

export default createTd;