import withAmountHtmlId from "./withAmountHtmlId/start.js";

import ShowAllHtmlId from "./ShowAllHtmlId/start.js";

const hookAllListeners = () => {
    withAmountHtmlId();
    ShowAllHtmlId();
};

export { hookAllListeners };