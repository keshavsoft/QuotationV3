const startFunc = async () => {
    const response = await fetch("./Index/Configs/Table/vertical.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch table config: ${response.statusText}`);
    }
    return response.json();
};

export default startFunc;
