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
    const rawData = await fetchData('/api/v5/ItemsTable/groupByParentPk');
    
    const now = new Date();
    
    const processedData = Array.isArray(rawData) ? rawData.map((row) => {
        if (!row.DateTime) {
            return { ...row, DateTimeDiff: "" };
        }
        const rowDate = new Date(row.DateTime);
        if (isNaN(rowDate.getTime())) {
            return { ...row, DateTimeDiff: "" };
        }

        const diffMs = now - rowDate;
        if (diffMs < 0) {
            return { ...row, DateTimeDiff: "Future" };
        }

        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let diffStr = "";
        if (diffSecs < 60) {
            diffStr = "Just now";
        } else if (diffMins < 60) {
            diffStr = `${diffMins}m ago`;
        } else if (diffHours < 24) {
            diffStr = `${diffHours}h ago`;
        } else if (diffDays === 1) {
            diffStr = "Yesterday";
        } else {
            diffStr = `${diffDays}d ago`;
        }

        return { ...row, DateTimeDiff: diffStr };
    }) : [];

    config.defaults.data = processedData;
    console.log("config : ", config);

    // ksTable1 = new window.KSAiCompTable(config);
    ksTable1 = new window.ks.classes.tableShowOnly(config);

    // window.ks.classes.tableShowOnly

    ksTable1.initShowTable();
};

export default startFunc;