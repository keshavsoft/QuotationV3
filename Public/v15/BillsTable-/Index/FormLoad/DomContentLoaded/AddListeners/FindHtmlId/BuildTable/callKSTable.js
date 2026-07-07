export const callKSTable = async (config) => {
    if (window?.KSTableComp?.initShowTable) {
        return window.KSTableComp.initShowTable(config);
    };
};