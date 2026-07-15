import headDescHtmlId from "./headDescHtmlId/start.js";
import balanceHtmlId from "./balanceHtmlId/start.js";

const hookAllListeners = () => {
    headDescHtmlId();
    balanceHtmlId();
};

export { hookAllListeners };