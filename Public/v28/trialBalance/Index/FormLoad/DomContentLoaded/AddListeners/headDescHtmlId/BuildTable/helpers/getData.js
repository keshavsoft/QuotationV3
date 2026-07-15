export const getData = async () => {
    const config = await fetch("/api/v8/purExpVouchers/trialBalance");
    const data = await config.json();

    return await data;
};