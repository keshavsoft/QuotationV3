import { getKSTableConfig } from "./getKSTableConfig.js";

async function fetchData(url) {
    try {
        // 1. Wait for the network request to resolve into a response object
        const response = await fetch(url);

        // 2. Check if the HTTP status code is OK (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 3. Wait for the response stream to parse completely into JSON
        const data = await response.json();
        return data;

    } catch (error) {
        // 4. Catch any network issues or JSON parsing failures
        console.error("Fetch operation failed:", error.message);
    }
};

const startFunc = async () => {
    const config = await getKSTableConfig();
    config.defaults.data = await fetchData('/api/v5/ItemsTable/groupByParentPk');
    console.log("config : ", config);

    ksTable1 = new window.KSAiCompTable(config);

    ksTable1.initShowTable();
    // await callKSTable(config);
};

export default startFunc;