const initVertical = (config, onSuccess) => {
    const ksVertical = new window.ks.classes.vertical(config);
    ksVertical.callbacks.vertical.onSuccess = onSuccess;
    ksVertical.initCreate();
    return ksVertical;
};

export { initVertical };
