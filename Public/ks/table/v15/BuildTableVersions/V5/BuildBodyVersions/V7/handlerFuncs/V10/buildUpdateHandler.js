const buildUpdateHandler = ({
    inServices,
    inEndPoints,
    inConfig,
    inDataStore,
    inVisibleColumnsConfig,
    inShowSerial,
    inTableBody, inTableFooter,
    inUpdateService,
    inUpdateEndPoint, inClientUpdate
}) => {
    const localDeleteHandler = async ({ item, index, presentPk, updatedItem }) => {
        // await inServices.actions.table.update({ inEndPoint: inEndPoints.update, payload: updatedItem })

        const fromService = await inUpdateService({ inEndPoint: inUpdateEndPoint, payload: updatedItem })

        // async ({ inEndPoint, payload }) => {…}
        // console.log("inServices,    inEndPoints, : ", inConfig);

        // debugger;
        // if (inConfig?.callbacks?.table.body.update) {
        //     inConfig?.callbacks?.table.body.update(updatedItem);
        // };

        if (inClientUpdate) {
            inClientUpdate(updatedItem);
        };

        // itemsConfig.callbacks.table.body.update = fromService => {
        //     console.log("----- : ", fromService);
        // };

    };

    return localDeleteHandler;
};

export default buildUpdateHandler;
