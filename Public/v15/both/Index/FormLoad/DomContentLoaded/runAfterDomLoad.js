import { buildHeader } from "./buildHeader.js";
import { hookAllListeners } from "./AddListeners/start.js";

const runAfterDomLoad = () => {
    import("../../../script.js").then(fromPromise => {

        buildHeader().then(fromPromise => {
            hookAllListeners();
        });

    });
};

export { runAfterDomLoad };
