import vFindHtmlId from "./vFindHtmlId/start.js";
import verticalHtmlId from "./verticalHtmlId/start.js";

import CreateHtmlId from "./CreateHtmlId/start.js";
import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";
import splitHtmlId from "./splitHtmlId/start.js";

const hookAllListeners = () => {
    vFindHtmlId();
    verticalHtmlId();
    CreateHtmlId();
    ShowAllHtmlId();

    LastHtmlId();
    FindHtmlId();
    splitHtmlId();
};

export { hookAllListeners };