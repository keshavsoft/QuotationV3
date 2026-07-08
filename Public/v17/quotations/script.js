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

function loadCss(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = href;

        link.onload = () => resolve(true);
        link.onerror = reject;

        document.head.appendChild(link);
    });
};

async function loadResource({ name, isLoaded, sources }) {
    if (isLoaded && isLoaded()) {
        if (window.ksShowLog) console.log(`${name} loaded from Firefox Extension`);
        return;
    }

    for (const source of sources) {
        try {
            if (source.type === "css") {
                await loadCss(source.url);
            } else {
                await loadScriptAsModuleCommon(source.url);
            }

            if (window.ksShowLog) console.log(`${name} loaded from ${source.label} : ${source.url}`);
            return;
        } catch {
            if (window.ksShowLog) console.log(`${name} -failed- from ${source.label} : ${source.url}`);
        }
    }

    throw new Error(`${name} could not be loaded`);
}

const ensureTailwind = () => loadResource({
    name: "Tailwind",
    isLoaded: () => document.getElementById("KSTableTailwind"),
    sources: [
        { type: "css", url: "./tailwind-3-min.css", label: "Local" },
        { type: "css", url: "https://keshavsoft.github.io/KsWebExtension/tailwind-3.css", label: "KsWebExtension" },
        { type: "css", url: "https://keshavsoft.github.io/tailwind-gen-css/tailwind-3.css", label: "tailwind-gen-css" }
    ]
});

const ensureKSComponents = () => loadResource({
    name: "KSComponents",
    sources: [
        { type: "js", url: "/ks/components/v18/index.js", label: "Local" },
        { type: "js", url: "https://keshavsoft.github.io/ks-web-comp-table/dist/v3.15/KSComponents.js", label: "git" }
    ]
});

const ensureKSHeader = () => loadResource({
    name: "KSHeader",
    isLoaded: () => !!window.KSHeader,
    sources: [
        { type: "js", url: "/header/v12/initHeader.js", label: "Local" },
        { type: "js", url: "https://keshavsoft.github.io/tailwind-header-dom/public/v13/ksheader.js", label: "git" }
    ]
});

const ensureKSTable = () => loadResource({
    name: "KSTable",
    isLoaded: () => !!window.KSTableComp,
    sources: [
        { type: "js", url: "/ks/table/v17/ai.js", label: "Local" },
        { type: "js", url: "https://keshavsoft.github.io/tailwind-table-dom-comp/dist/v15/kstablecomp.js", label: "git" }
    ]
});

const ensureKSVertical = () => loadResource({
    name: "KSVertical",
    isLoaded: () => !!window.KSAiVertical,
    sources: [
        { type: "js", url: "/ks/vertical/v11/ai.js", label: "Local" },
        { type: "js", url: "https://keshavsoft.github.io/tailwind-vertical-dom/dist/v2.10/ksvertical.js", label: "git" }
    ]
});

const ensureKSTableOnly = () => loadResource({
    name: "KSTableOnly",
    isLoaded: () => !!window.KSTableComp,
    sources: [
        { type: "js", url: "/ks/tableOnly/v4/ai.js", label: "Local" },
        { type: "js", url: "https://keshavsoft.github.io/tailwind-table-dom-comp-show/dist/v3/kstableonly.js", label: "git" }
    ]
});

// Load resources in parallel
await Promise.all([
    ensureTailwind(),
    ensureKSComponents(),
    ensureKSHeader(),
    ensureKSTable(),
    ensureKSVertical(),
    ensureKSTableOnly()
]);