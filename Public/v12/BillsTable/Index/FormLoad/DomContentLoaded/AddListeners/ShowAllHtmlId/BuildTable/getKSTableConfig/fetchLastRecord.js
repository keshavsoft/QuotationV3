const fetchLastRecord = async () => {
    try {
        const response = await fetch("/api/v2/ItemsTable/lastRecord");
        if (!response.ok) {
            console.warn(`Failed to fetch last record: ${response.statusText}`);
            return null;
        }
        const lastJson = await response.json();
        return lastJson?.ParentPk ?? null;
    } catch (error) {
        console.warn("Error fetching or parsing last record:", error);
        return null;
    }
};

export { fetchLastRecord };
