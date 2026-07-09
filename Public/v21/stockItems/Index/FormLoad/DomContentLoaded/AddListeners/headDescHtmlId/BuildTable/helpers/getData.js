export const getData = async () => {
    const config = await fetch("/api/v6/StockItems/showAll");
    const data = await config.json();

    return await data;
};