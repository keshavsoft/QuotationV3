import showAllHtmlId from "./showAllHtmlId/start.js";
import singleHtmlId from "./singleHtmlId/start.js";

const hookAllListeners = () => {
    showAllHtmlId();
    singleHtmlId();
};

export { hookAllListeners };