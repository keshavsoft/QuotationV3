// /header/v1/buildWrapper.js

export const buildWrapper = () => {

    const nav = document.createElement("nav");

    nav.className = "bg-gray-800 text-white";

    const outerDiv = document.createElement("div");

    outerDiv.className = `mx-auto px-3 py-3
    max-w-3xl
    lg:max-w-5xl
    xl:max-w-full xl:px-10`;

    const innerDiv = document.createElement("div");

    innerDiv.className =
        "flex flex-wrap items-center justify-between";

    outerDiv.appendChild(innerDiv);

    nav.appendChild(outerDiv);

    return {
        nav,
        innerDiv
    };
};