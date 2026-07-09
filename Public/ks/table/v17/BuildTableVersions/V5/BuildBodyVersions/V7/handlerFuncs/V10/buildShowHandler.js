const buildDeleteHandler = ({
    inServices,
    inEndPoints,
    inConfig,
    inDataStore,
    inVisibleColumnsConfig,
    inShowSerial,
    inTableBody, inTableFooter,
    inCallBack
}) => {
    const localDeleteHandler = async (options) => {
        if (inCallBack) inCallBack(options);
    };

    return localDeleteHandler;
};

export default buildDeleteHandler;
