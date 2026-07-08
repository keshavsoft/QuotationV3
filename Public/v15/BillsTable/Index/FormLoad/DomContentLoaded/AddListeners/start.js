import withAmountHtmlId from "./withAmountHtmlId/start.js";

import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

import headHtmlId from "./headHtmlId/start.js";

const hookAllListeners = () => {
    withAmountHtmlId();
    ShowAllHtmlId();
    headHtmlId();
};

export { hookAllListeners };