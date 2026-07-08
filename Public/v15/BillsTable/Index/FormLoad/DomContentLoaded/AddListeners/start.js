import withAmountHtmlId from "./withAmountHtmlId/start.js";

import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import headHtmlId from "./headHtmlId/start.js";

import headDescHtmlId from "./headDescHtmlId/start.js";
import createHtmlId from "./createHtmlId/start.js";

const hookAllListeners = () => {
    withAmountHtmlId();
    ShowAllHtmlId();
    headHtmlId();
    headDescHtmlId();
    createHtmlId();
};

export { hookAllListeners };