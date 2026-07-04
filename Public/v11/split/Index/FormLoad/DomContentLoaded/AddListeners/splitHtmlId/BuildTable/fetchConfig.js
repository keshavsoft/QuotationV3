const fetchConfig = async () => {
    const response = await fetch("./Index/Configs/Table/config.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch table config: ${response.statusText}`);
    };
    const configJson = await response.json();
    console.log("---------from : ", configJson.callbacks);

    configJson.callbacks.table.onEdit = ({ item, index, presentPk }) => {
        console.log("from : ", item, index, presentPk);
        const verticalContainer = document.getElementById("kSVerticalContainer");
        if (verticalContainer) {
            Object.entries(item).forEach(([key, value]) => {
                const input = verticalContainer.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = value ?? "";
                    input.dispatchEvent(new Event("change", { bubbles: true }));
                };
            });
        };
    };

    return configJson;
};

export { fetchConfig };
