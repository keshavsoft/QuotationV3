const getData = async () => {
    const config = await fetch("/api/masters/ledgerNames/v1/showAll");
    const data = await config.json();

    return await data;
};

export default getData;