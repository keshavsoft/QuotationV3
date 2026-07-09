import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import headDescHtmlId from "./headDescHtmlId/start.js";
import createHtmlId from "./createHtmlId/start.js";

const hookAllListeners = () => {
    ShowAllHtmlId();
    headDescHtmlId();
    createHtmlId();
};

export { hookAllListeners };