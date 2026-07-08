export const getKSTableConfig = async () => {
    const config = await fetch("./Index/Configs/headDesc/config.json");
    // debugger;
    const configJson = await config.json();

    return configJson;
};