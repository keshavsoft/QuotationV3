// /header/v1/buildBrand.js

export const buildBrand = ({ inHeading = "KeshavSoft", inHtmlId = "titlehtmlId" }) => {

    const div = document.createElement("div");

    div.className = "text-xl font-semibold";

    div.innerText = inHeading;

    div.id = inHtmlId;

    return div;
};