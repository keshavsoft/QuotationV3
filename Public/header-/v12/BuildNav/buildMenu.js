// /header/v1/buildMenu.js

export const buildMenu = ({ inUlClass = "" }) => {

    const ul = document.createElement("ul");

    ul.id = "menu";

    ul.className = `w-full hidden flex flex-col space-y-2 mt-4
    md:flex md:flex-row md:space-y-0 md:gap-4
    md:mt-0 md:w-auto md:flex-wrap ${inUlClass}`;

    return ul;
};