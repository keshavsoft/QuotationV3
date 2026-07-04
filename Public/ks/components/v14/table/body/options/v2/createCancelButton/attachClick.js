import startFunc from "./start.js";

const attachClick = ({ inButton }) => {
    inButton.onclick = (event) => {
        const currentTarget = event.currentTarget;
        startFunc({ inCurrentTarget });
    };
};
export default attachClick;
