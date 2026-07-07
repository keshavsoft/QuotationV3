export const getKSTableConfig = async () => {
    const config = await fetch("./Index/Configs/vertical/config.json");
    // debugger;
    const configJson = await config.json();

    // configJson.callbacks.table.footer.onSave = fromKSLibrary => {
    //     console.log("fromKSLibrary : ", fromKSLibrary);
    // };

    return configJson;
};