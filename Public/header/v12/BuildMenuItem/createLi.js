export const createLi = (cls = "") => {
    const li = document.createElement("li");
    li.className = cls;
    return li;
};