const prepareConfig = async (inpk) => {
    const config = await fetch("./Index/Configs/find/config.json");
    // debugger;
    const configJson = await config.json();

    const pk = inpk;

    const findColumn = configJson.columnsConfig.find(element => {
        return element.field === "ParentPk"
    });

    findColumn.defaultValue = pk;

    configJson.endPoints.read = configJson.endPoints.read.replace("<ParentPk>", pk);

    return configJson;
};

export const getKSTableConfig = async () => {
    const config = await fetch("./Index/Configs/showAll/config.json");
    // debugger;
    const configJson = await config.json();
    // console.log("configJson : ", configJson.callbacks.table.body);

    configJson.callbacks.table.body.show = async fromKSLibrary => {

        const itemsConfig = await prepareConfig(fromKSLibrary.presentPk);

        ksTable2 = new window.ks.classes.tableShowOnly(itemsConfig);
        ksTable2.initShowTable();
    };

    return configJson;
};