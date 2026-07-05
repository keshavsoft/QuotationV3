import buildTable from "./BuildTable/index.js";

let jFLocalToInputhtmlId = (inValue) => {
    let jVarLocalHtmlId = 'htmlId';
    let jVarLocalhtmlId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalhtmlId === null === false) {
        jVarLocalhtmlId.innerHTML = inValue;
    };
};

const clickFuncToRun = ({ inCurrentTarget }) => {
    jFLocalToInputhtmlId("Vertical Find");

    buildTable().then();
};

export { clickFuncToRun };