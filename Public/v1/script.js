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
            const fromPromise = await loadScriptAsModuleCommon("https://keshavsoft.github.io/ks-web-comp-table/Public/v2.6/KSTableComponents.js");

            console.log("KSTableComponents loaded from git : ks-web-comp-table-2.6");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    // tryMenu().then();
    // tryNav().then();
    tryTable().then();

    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaa----------");

    // tryVertical().then();
    // tryTableFoot().then();
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
            const fromPromise = await loadScriptAsModuleCommon("https://keshavsoft.github.io/tailwind-header-dom/Public/v5.10/ksheader.js");

            console.log("KSHeader loaded from git : tailwind-header-dom-5.10");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    async function tryLocal() {
        try {
            const fromPromise = await loadScriptAsModuleCommon("/header/v11/initHeader.js");

            console.log("KSHeader loaded from local : header-v11");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    if (isKSTableLoaded()) {
        console.log("KSHeader loaded from Firefox Extension");
        return;
    };

    // if (await tryLocal()) return;

    if (await tryGitHub()) return;

    throw new Error("KSTable could not be loaded");
};

async function ensureKSTableComp() {
    function loadScriptAsModule(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");

            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error(`Failed to load: ${src}`));
            script.type = "module";

            document.head.appendChild(script);
        });
    };

    function isKSTableLoaded() {
        // console.log("aaaaaaaa : ", window.KSTableComp, window.KSHeader);

        return !!window.KSTableComp;
    };

    async function tryGitHub() {
        try {
            const fromPromise = await loadScriptAsModule("https://keshavsoft.github.io/tailwind-table-dom-comp/Public/v11/kstablecomp.js");

            console.log("KSTableComp loaded from git : tailwind-table-dom-comp-11");

            if (fromPromise) return true;
        } catch { return false };

        return false;
    };

    async function tryLocal() {
        try {
            const fromPromise = await loadScriptAsModule("/TableComp/v11/entry.js");

            console.log("KSTableComp loaded from Local Server : TableComp/v11");

            if (fromPromise) return true;
        } catch {
            console.log("KSTableComp failed from Local Server : TableComp/v10");

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

    throw new Error("KSTableComp could not be loaded");
};

ensureTailwind().then();

// await ensureTailwind();

await ensureKSComponents();

// ensureKSComponents().then(fromPromise => {
//     // ensureKSHeader().then();

//     // ensureKSTableComp().then();
// });

await ensureKSHeader();

await ensureKSTableComp();
