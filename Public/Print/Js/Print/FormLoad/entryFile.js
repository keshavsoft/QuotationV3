import { StartFunc as StartFuncFromDOMContentLoaded } from "./DOMContentLoaded/startFunc.js";

let StartFunc = () => {
    document.addEventListener('DOMContentLoaded', StartFuncFromDOMContentLoaded);
};

export { StartFunc };