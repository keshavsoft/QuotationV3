import onReadFail from "../../../../CommonFuncs/onReadFail.js";

async function updateData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'PUT', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Tell the server you are sending JSON
                // 'Authorization': 'Bearer YOUR_TOKEN' // (Optional) Add auth headers if needed
            },
            body: JSON.stringify(data) // Convert JavaScript object to a JSON string
        });

        // Check if the response status is in the 200-299 range
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedResult = await response.json(); // Parse the JSON response text
        return updatedResult;
    } catch (error) {
        console.error('Error during PUT request:', error);
        throw error; // Re-throw to handle it at the caller level
    }
};

const transformConfig = ({ configJson, lastPk }) => {
    const modifiedConfig = { ...configJson };

    if (modifiedConfig.callbacks?.table) {
        modifiedConfig.callbacks.table.onReadFail = onReadFail;
    }

    if (Array.isArray(modifiedConfig.columnsConfig)) {
        const parentPkColumn = modifiedConfig.columnsConfig.find(
            element => element.field === "ParentPk"
        );
        if (parentPkColumn) {
            const parsedPk = parseInt(lastPk, 10);
            parentPkColumn.defaultValue = isNaN(parsedPk) ? 0 : parsedPk;
        }
    }

    if (modifiedConfig.endPoints?.read && lastPk !== undefined && lastPk !== null) {
        modifiedConfig.endPoints.read = modifiedConfig.endPoints.read.replace("<ParentPk>", lastPk);
    };

    if ("callbacks" in modifiedConfig) {
        modifiedConfig.callbacks.table.body.update = alterRow => {
            // console.log("nnnnnnnnnnnnnnnn ", alterRow);

            updateData("/api/v5/ItemsTable/modify", alterRow).then();

            // console.log("alterRow---------- : ", alterRow);
        };
    };

    return modifiedConfig;
};

export { transformConfig };
