import CreateHtmlId from "./CreateHtmlId/start.js";
import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";
import splitHtmlId from "./splitHtmlId/start.js";

const hookAllListeners = () => {
    CreateHtmlId();
    ShowAllHtmlId();

    LastHtmlId();
    FindHtmlId();
    splitHtmlId();
};

export { hookAllListeners };