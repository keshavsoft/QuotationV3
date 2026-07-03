function loadScriptAsModuleCommon(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load: ${src}`));
        script.type = "module";

        document.head.appendChild(script);
    });
};

async function ensureKSComponents() {
    async function tryTable() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("https://keshavsoft.github.io/ks-web-comp-table/dist/v3.11/KSComponents.js");

            console.log("KSComponents loaded from git : ks-web-comp-table-3.11");

            if (fromPromise) return true;
        } catch {
            console.log("KSComponents -failed- from git : ks-web-comp-table-3.11");
            return false
        };

        return false;
    };

    tryTable().then();
};

async function ensureTailwind() {
    function loadCss(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement("link");

            link.rel = "stylesheet";
            link.href = href;

            link.onload = resolve;
            link.onerror = reject;

            document.head.appendChild(link);
        });
    };

    const tryLocal = async () => {
        try {
            // await loadCss("./tailwind-3.css");
            await loadCss("./tailwind-3-min.css");

            console.log("Tailwind loaded locally");
            return true;
        } catch { return false; }
    };

    const tryKsWebExtension = async () => {
        try {
            await loadCss("https://keshavsoft.github.io/KsWebExtension/tailwind-3.css");

            console.log("Tailwind loaded from KsWebExtension");
            return true;
        } catch { return false; }
    };

    const tryGit = async () => {
        try {
            await loadCss("https://keshavsoft.github.io/tailwind-gen-css/tailwind-3.css");

            console.log("Tailwind loaded from tailwind-gen-css");
            return true;
        } catch { return false; }
    };

    if (document.getElementById("KSTableTailwind")) {
        console.log("Tailwind loaded from Firefox Extension");
        return;
    };

    if (await tryLocal()) return;
    if (await tryKsWebExtension()) return;
    if (await tryGit()) return;

    throw new Error("Tailwind could not be loaded");
};

async function ensureKSHeader() {
    function isKSTableLoaded() {
        return !!window.KSHeader;
    };

    async function tryGitHub() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("https://keshavsoft.github.io/tailwind-header-dom/public/v12/ksheader.js");

            console.log("KSHeader loaded from git : tailwind-header-dom-12");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    async function tryLocal() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("/header/v12/initHeader.js");

            console.log("KSHeader loaded from local : header-v12");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    if (isKSTableLoaded()) {
        console.log("KSHeader loaded from Firefox Extension");
        return;
    };

    if (await tryLocal()) return;

    if (await tryGitHub()) return;

    throw new Error("KSTable could not be loaded");
};

async function ensureKSTableOnly() {
    function isKSTableLoaded() {
        // console.log("aaaaaaaa : ", window.KSTableComp, window.KSHeader);

        return !!window.KSTableComp;
    };

    async function tryGitHub() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("https://keshavsoft.github.io/tailwind-table-dom-comp-show/dist/v3/kstableonly.js");

            console.log("kstableonly loaded from git : tailwind-table-dom-comp-show-3");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    async function tryLocal() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("/ks/tableOnly/v3/ai.js");

            console.log("KSTableonly loaded from Local Server : ks/tableOnly/v3");

            if (fromPromise) return true;
        } catch {
            console.log("KSTableComp failed from Local Server : TableComp/v15");

            return false
        };

        return false;
    };

    if (isKSTableLoaded()) {
        console.log("KSTableComp-- loaded from Firefox Extension");
        return;
    };
    // console.log("------------");

    if (await tryLocal()) return;

    if (await tryGitHub()) return;

    throw new Error("kstableonly could not be loaded");
};

ensureTailwind().then();

await ensureKSComponents();

await ensureKSHeader();

await ensureKSTableOnly();
