const getOptions = ({ inElement }) => {
    return {
        item: inElement.ksItem,
        index: inElement.ksIndex,
        onDeleteFunc: inElement.ksOnDeleteFunc,
        onEditFunc: inElement.ksOnEditFunc
    };
};

export default getOptions;
