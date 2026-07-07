export const createAnchor = ({
    inHtmlId = "", inHref = "#", inClass = "", inTableName = "",
    inSvgName = "", inSvgDivClass = "", inClassName, inTextToShow
}) => {
    const a = document.createElement("ks-menu-item");

    a.setAttribute(
        "ks-id",
        inHtmlId || ""
    );

    a.setAttribute(
        "ks-href",
        inHref || "#"
    );

    a.setAttribute(
        "ks-class",
        inClass || ""
    );

    a.setAttribute("ks-svgName", inSvgName || "");
    a.setAttribute("ks-svgDivClass", inSvgDivClass || "");

    a.setAttribute("ks-className", inClassName || "");
    a.setAttribute("ks-textToShow", inTextToShow || "");

    return a;
};