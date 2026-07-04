const fetchConfig = async () => {
    const response = await fetch("./Index/Configs/Table/config.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch table config: ${response.statusText}`);
    };
    const configJson = await response.json();
    console.log("---------from : ", configJson.callbacks);

    configJson.callbacks.table.onEdit = (fromLibrary) => {
        console.log("from : ", fromLibrary);

    };

    return configJson;
};

export { fetchConfig };
