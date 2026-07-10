const fetchItemsConfig = async () => {
    const response = await fetch("./Index/Configs/create/itemsConfig.json");
    return await response.json();
};

export { fetchItemsConfig };
