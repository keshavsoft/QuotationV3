import TableHtmlId from "./TableHtmlId/start.js";
import LastHtmlId from "./LastHtmlId/start.js";
import FindHtmlId from "./FindHtmlId/start.js";
import ShowAllHtmlId from "./ShowAllHtmlId/start.js";
import splitHtmlId from "./splitHtmlId/start.js";

const hookAllListeners = () => {
    TableHtmlId();
    LastHtmlId();
    FindHtmlId();
    ShowAllHtmlId();
    splitHtmlId();
};

export { hookAllListeners };