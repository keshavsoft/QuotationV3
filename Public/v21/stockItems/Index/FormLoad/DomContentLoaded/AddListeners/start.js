import headDescHtmlId from "./headDescHtmlId/start.js";
import createHtmlId from "./createHtmlId/start.js";

const hookAllListeners = () => {
    headDescHtmlId();
    createHtmlId();
};

export { hookAllListeners };