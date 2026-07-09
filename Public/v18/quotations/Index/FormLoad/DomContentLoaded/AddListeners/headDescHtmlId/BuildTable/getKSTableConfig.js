export const getKSTableConfig = async () => {
    const config = await fetch("./Index/Configs/headDesc/billShow.json");
    // debugger;
    const configJson = await config.json();

    return configJson;
};