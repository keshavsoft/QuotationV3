const attachClick = ({ inButton, item, index, onDeleteFunc }) => {
    inButton.onclick = () => onDeleteFunc?.({ item, index, presentPk: item?.pk });
};

export default attachClick;
