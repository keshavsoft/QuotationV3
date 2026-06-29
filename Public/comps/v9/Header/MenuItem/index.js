import { createAnchor } from "./createAnchor.js";
import { createIcon } from "./createIcon.js";

class KSMenuItem extends HTMLElement {
    connectedCallback() {
        const a = createAnchor({
            inHtmlId: this.getAttribute("ks-id"),
            inHref: this.getAttribute("ks-href"),
            inTableName: this.getAttribute("ks-table-name"),
            inClass: this.getAttribute("ks-class")
        });

        const text = this.getAttribute("ks-textToShow") || "";
        const className = this.getAttribute("ks-className") || "";

        const svgName = this.getAttribute("ks-svgName") || "";
        const svgDivClass = this.getAttribute("ks-svgDivClass") || "";

        const svg = createIcon({
            inSvgName: svgName,
            inSvgDivClass: svgDivClass
        });

        const span =
            document.createElement("span");

        span.textContent = text;

        span.className = className;

        while (this.firstChild) {
            a.appendChild(
                this.firstChild
            );
        };

        a.append(
            svg,
            span
        );

        a.addEventListener("click", event => {
            const currentAnchor = event.currentTarget;
            const menu = currentAnchor
                .closest("nav")
                ?.querySelector("#menu");

            console.log("menu : ", menu, currentAnchor);

            menu?.classList.add("hidden");

            const nav = currentAnchor.closest("nav") || currentAnchor.closest("ks-nav");
            if (nav) {
                const anchors = nav.querySelectorAll("ks-menu-item a");
                anchors.forEach(item => {
                    item.classList.remove("bg-blue-600");
                    item.classList.add("lg:bg-transparent");
                });
            };

            currentAnchor.classList.add("bg-blue-600");
            currentAnchor.classList.remove("lg:bg-transparent");
        });

        this.appendChild(a);
    }
}

customElements.define(
    "ks-menu-item",
    KSMenuItem
);

window.KSMenuItem = KSMenuItem;

export default {};
