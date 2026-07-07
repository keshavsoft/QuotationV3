// /header/v1/buildHamburger.js

export const buildHamburger = () => {

    const button = document.createElement("button");

    button.className = "text-xl px-4 py-1 md:hidden";

    button.innerText = "☰";

    button.addEventListener("click", () => {

        document
            .getElementById("menu")
            .classList.toggle("hidden");

    });

    return button;
};