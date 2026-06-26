import { StartFunc as Status200 } from "./status200.js";

let StartFunc = async ({ inResponse }) => {
    let jVarLocalResponse = await inResponse;

    if (jVarLocalResponse.status === 200) {
        let jVarLocalDataAsJson = await jVarLocalResponse.json();

        Status200({ inResponseAsJson: jVarLocalDataAsJson });
    };
};

export { StartFunc };