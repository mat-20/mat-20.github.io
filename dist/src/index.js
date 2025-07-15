import { updateMetaTags } from './meta.js';
console.log('index.js loaded');
window.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM fully loaded');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'pink') {
        document.documentElement.classList.add('theme-pink');
    } else if (savedTheme === 'frog') {
        document.documentElement.classList.add('theme-frog');
    }
    // Update meta tags dynamically
    updateMetaTags();
    // Show live time in #time element
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

//# sourceMappingURL=index.js.map