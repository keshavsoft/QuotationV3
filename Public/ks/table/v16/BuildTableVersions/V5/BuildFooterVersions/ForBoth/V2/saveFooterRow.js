import afterMutation from "../../../AfterMutation/V5/index.js";

const saveFooterRow = async ({
    inDataStore,
    callbacks,
    inServices,
    inEndPoints,
    inVisibleColumnsConfig,
    inShowActions,
    inShowSerial,
    inPayload, inConfig,
    inTableBody,
    inTableFooter, canSave
}) => {
    // console.log("ssssssssss----------ppppppp", callbacks);
    // callbacks.onSave({ canSave });
    if (!canSave) return;

    try {
        const fromSave = await inServices.actions.createNoRepsonse({
            inEndPoint: inEndPoints.create,
            payload: inPayload
        });

        if (fromSave.ok) {
            afterMutation({
                inDataStore, inServices, inEndPoints,
                inTableBody, inVisibleColumnsConfig,
                inShowSerial, inShowActions, inTableFooter,
                inIsUpdateFooter: true, inConfig
            });
        };
    } catch (err) {
        console.error(err);
        return;
    };
};

export { saveFooterRow };
