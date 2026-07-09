const initTable = (itemsConfig, onUpdate) => {
    const clonedConfig = { ...itemsConfig };
    
    clonedConfig.callbacks = clonedConfig.callbacks || {};
    clonedConfig.callbacks.table = clonedConfig.callbacks.table || {};
    clonedConfig.callbacks.table.body = clonedConfig.callbacks.table.body || {};
    
    clonedConfig.callbacks.table.body.update = onUpdate;

    const ksTable = new window.ks.classes.compTable(clonedConfig);
    ksTable.initShowTable();
    return ksTable;
};

export { initTable };
