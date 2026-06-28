import TableHtmlId from "./TableHtmlId/start.js";
import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";

const hookAllListeners = () => {
    TableHtmlId();
    LastHtmlId();
    FindHtmlId();
};

export { hookAllListeners };