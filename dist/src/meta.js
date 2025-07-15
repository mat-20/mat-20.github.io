export const metaMap = {
    "/index.html": {
        title: "Matt Gravener Portfolio – Homepage",
        description: "Matt Gravener's professional portfolio showcasing projects, skills, and contact info.",
        url: "https://yourdomain.com/index.html",
        image: "https://yourdomain.com/preview-homepage.png"
    },
    "/weather.html": {
        title: "Weather Page",
        description: "Check the latest weather updates.",
        url: "https://yourdomain.com/weather.html",
        image: "https://yourdomain.com/preview-weather.png"
    }
};
export function updateMetaTags() {
    const path = window.location.pathname;
    const meta = metaMap[path];
    if (!meta) return;
    const setContent = (id, content)=>{
        const el = document.getElementById(id);
        if (el) el.setAttribute("content", content);
    };
    const setText = (id, text)=>{
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    setText("page-title", meta.title);
    document.title = meta.title;
    setContent("page-description", meta.description);
    setContent("og:title", meta.title);
    setContent("og:description", meta.description);
    setContent("og:url", meta.url);
    setContent("og:image", meta.image);
    setContent("twitter:title", meta.title);
    setContent("twitter:description", meta.description);
    setContent("twitter:image", meta.image);
}

//# sourceMappingURL=meta.js.map