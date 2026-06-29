// import "../WebComponents/v2/nav/index.js";

export const buildNav = ({ inTitle = {}, inUiClasses = {} }) => {
    const nav = document.createElement("ks-nav");

    // nav.setAttribute("ks-title", inTitle.text || "");
    // nav.setAttribute("ks-title-id", inTitle.htmlId || "");
    // nav.setAttribute("ks-ul-class", inUiClasses?.ulClass || "");

    if ("text" in inTitle) nav.setAttribute("ks-title", inTitle.text || "");
    if ("htmlId" in inTitle) nav.setAttribute("ks-title-id", inTitle.htmlId || "");

    if ("ulClass" in inUiClasses) nav.setAttribute("ks-ul-class", inUiClasses?.ulClass || "");

    if ("navClass" in inUiClasses) nav.setAttribute("ks-nav-class", inUiClasses?.navClass || "");
    if ("brandClass" in inUiClasses) nav.setAttribute("ks-brand-class", inUiClasses?.brandClass || "");

    // nav.setAttribute("ks-nav-class", inUiClasses?.navClass || "");
    // nav.setAttribute("ks-brand-class", inUiClasses?.brandClass || "");

    // console.log("inUiClasses : ", inUiClasses);


    return nav;
};
