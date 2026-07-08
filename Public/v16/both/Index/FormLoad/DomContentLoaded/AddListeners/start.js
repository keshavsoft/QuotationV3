import verticalHtmlId from "./verticalHtmlId/start.js";

import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";

const hookAllListeners = () => {
    verticalHtmlId();
    ShowAllHtmlId();

    LastHtmlId();
    FindHtmlId();
};

export { hookAllListeners };