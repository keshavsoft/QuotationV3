import { clickFuncToRun } from "./clickFunc.js";

const funcToRun = () => {
    const htmlElement = document.getElementById('balanceHtmlId');
    // debugger;
    htmlElement.addEventListener("click", (event) =>
        clickFuncToRun({ inCurrentTarget: event.currentTarget })
    );
};

export default funcToRun;
