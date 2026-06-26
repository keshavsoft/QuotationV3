import { StartFunc as StartFuncAddListeners } from "./AddListeners/startFunc.js";
import { StartFunc as StartFuncFromShowOnDom } from "./showOnDom.js";

const StartFunc = () => {
    StartFuncAddListeners();
    StartFuncFromShowOnDom();
};

export { StartFunc };
