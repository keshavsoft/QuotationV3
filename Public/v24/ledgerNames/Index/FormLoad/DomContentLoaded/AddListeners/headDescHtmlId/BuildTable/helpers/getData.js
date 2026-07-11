export const getData = async () => {
    const config = await fetch("/api/v7/LedgerNames/showAll");
    const data = await config.json();

    return await data;
};