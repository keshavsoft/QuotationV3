import verticalHtmlId from "./verticalHtmlId/start.js";

import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";
import splitHtmlId from "./splitHtmlId/start.js";

const hookAllListeners = () => {
    verticalHtmlId();
    ShowAllHtmlId();

    LastHtmlId();
    FindHtmlId();
    splitHtmlId();
};

export { hookAllListeners };