import TableHtmlId from "./TableHtmlId/start.js";
import LastHtmlId from "./LastHtmlId/start.js";

const hookAllListeners = () => {
    TableHtmlId();
    LastHtmlId();
};

export { hookAllListeners };