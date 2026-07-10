export const getData = async () => {
    const config = await fetch("/api/v7/purExpVouchers/showAll");
    const data = await config.json();

    return await data;
};