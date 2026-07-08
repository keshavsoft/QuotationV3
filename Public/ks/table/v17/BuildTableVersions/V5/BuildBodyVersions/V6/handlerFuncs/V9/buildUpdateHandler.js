const buildUpdateHandler = ({
    inServices,
    inEndPoints,
    inConfig,
    inDataStore,
    inVisibleColumnsConfig,
    inShowSerial,
    inTableBody, inTableFooter
}) => {
    const localDeleteHandler = async ({ item, index, presentPk, updatedItem }) => {
        if (inConfig?.callbacks?.table.body.update) {
            inConfig?.callbacks?.table.body.update(updatedItem);
        };
    };

    return localDeleteHandler;
};

export default buildUpdateHandler;
