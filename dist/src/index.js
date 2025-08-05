import { updateMetaTags } from './meta.js';
console.log('index.js loaded');

const draggables = document.querySelectorAll(".draggable");
    let zIndexCounter = 1;

    draggables.forEach(container => {
        const header = container.querySelector(".draggable-header");
        const resizer = container.querySelector(".resizer");

        // Bring to front on click
        container.addEventListener("mousedown", () => {
            container.style.zIndex = ++zIndexCounter;
        });

        // Drag logic
        header.addEventListener("mousedown", (e) => {
            e.preventDefault();
            let offsetX = e.clientX - container.offsetLeft;
            let offsetY = e.clientY - container.offsetTop;

            function onMouseMove(e) {
                container.style.left = `${e.clientX - offsetX}px`;
                container.style.top = `${e.clientY - offsetY}px`;
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // Resize logic
        resizer.addEventListener("mousedown", (e) => {
            e.preventDefault();
            let startX = e.clientX;
            let startY = e.clientY;
            let startWidth = parseInt(getComputedStyle(container).width);
            let startHeight = parseInt(getComputedStyle(container).height);

            function onMouseMove(e) {
                container.style.width = `${startWidth + (e.clientX - startX)}px`;
                container.style.height = `${startHeight + (e.clientY - startY)}px`;
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
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
