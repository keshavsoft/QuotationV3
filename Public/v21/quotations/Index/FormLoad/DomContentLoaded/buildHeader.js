const buildHeader = async () => {
    const fromFetch = await fetch("./Index/headers.json");
    const headerConfig = await fromFetch.json();

    await window.KSHeader(headerConfig);
};

export { buildHeader };