export const getData = async () => {
    const config = await fetch("/api/v4/ItemsTable/groupBy");
    const data = await config.json();

    return await data;
};

export const getHeadData = async () => {
    const config = await fetch("/api/v5/BillsTable/showAll");
    const data = await config.json();

    return await data;
};
