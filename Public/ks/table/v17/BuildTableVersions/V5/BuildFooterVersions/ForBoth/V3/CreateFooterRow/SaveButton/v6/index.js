import { createButton } from "./createButton.js";
import { attachClickListener } from "./attachClickListener.js";

class KsSaveButton extends HTMLElement {
    connectedCallback() {
        if (this.querySelector("button")) return;

        const btn = createButton();
        this.appendChild(btn);

        attachClickListener({
            htmlButtonElement: btn,
            inOnSaveFunc: (args) => {
                if (typeof this.onSave === "function") {
                    this.onSave(args);
                }
            }
        });
    }
}

if (!customElements.get("ks-save-button")) {
    customElements.define("ks-save-button", KsSaveButton);
}
