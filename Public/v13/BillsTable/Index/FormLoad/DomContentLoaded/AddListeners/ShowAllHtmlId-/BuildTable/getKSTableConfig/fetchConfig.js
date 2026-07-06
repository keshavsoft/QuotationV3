const fetchConfig = async () => {
    const response = await fetch("./Index/Configs/ShowAll/config.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch table config: ${response.statusText}`);
    }
    return response.json();
};

export { fetchConfig };
