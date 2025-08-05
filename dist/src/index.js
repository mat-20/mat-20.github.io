import { updateMetaTags } from './meta.js';
console.log('index.js loaded');

const draggables = document.querySelectorAll(".draggable");
    let zIndexCounter = 1;

    // Load saved state
    draggables.forEach(container => {
        const id = container.dataset.id;
        const saved = localStorage.getItem(`window-${id}`);
        if (saved) {
            const state = JSON.parse(saved);
            container.style.left = state.left;
            container.style.top = state.top;
            container.style.width = state.width;
            container.style.height = state.height;
        }

        // Bring to front
        container.addEventListener("mousedown", () => {
            container.style.zIndex = ++zIndexCounter;
        });

        // Dragging
        const header = container.querySelector(".draggable-header");
        header.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const offsetX = e.clientX - container.offsetLeft;
            const offsetY = e.clientY - container.offsetTop;

            function onMouseMove(e) {
                container.style.left = `${e.clientX - offsetX}px`;
                container.style.top = `${e.clientY - offsetY}px`;
            }

            function onMouseUp() {
                saveWindowState(container);
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // Resizing
        const resizer = container.querySelector(".resizer");
        resizer.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(getComputedStyle(container).width);
            const startHeight = parseInt(getComputedStyle(container).height);

            function onMouseMove(e) {
                container.style.width = `${startWidth + (e.clientX - startX)}px`;
                container.style.height = `${startHeight + (e.clientY - startY)}px`;
            }

            function onMouseUp() {
                saveWindowState(container);
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });

    // Save function
    function saveWindowState(container) {
        const id = container.dataset.id;
        const state = {
            left: container.style.left,
            top: container.style.top,
            width: container.style.width,
            height: container.style.height
        };
        localStorage.setItem(`window-${id}`, JSON.stringify(state));
    }

    // Reset button
    document.getElementById("reset-windows").addEventListener("click", () => {
        draggables.forEach(container => {
            const id = container.dataset.id;
            localStorage.removeItem(`window-${id}`);
            container.style.left = "100px";
            container.style.top = "100px";
            container.style.width = "300px";
            container.style.height = "auto";
        });
    });

    
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    loadSlideshowImages();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'pink') {
        document.documentElement.classList.add('theme-pink');
    } else if (savedTheme === 'frog') {
        document.documentElement.classList.add('theme-frog');
    }
    updateMetaTags();
    function updateTime() {
        const timeElement = document.getElementById('time');
        if (!timeElement) {
            console.warn('No #time element found!');
            return;
        }
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
    updateTime();
    setInterval(updateTime, 1000);
});
