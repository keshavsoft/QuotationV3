export const getData = async () => {
    const config = await fetch("/api/v8/ledger/showAll");
    const data = await config.json();

    return await data;
};