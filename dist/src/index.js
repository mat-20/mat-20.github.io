import { updateMetaTags } from './meta.js';
console.log('index.js loaded');

async function loadSlideshowImages() {
    const images = [
        'slide1.jpg',
        'slide2.jpg',
        'slide3.jpg',
        'slide4.jpg',
        'slide5.jpg',
        'slide6.jpg',
        'slide7.jpg',
        'slide8.jpg',
        'slide9.jpg',
        'slide10.jpg',
        'slide11.jpg',
        'slide12.jpg',
        // add more if needed
    ];

    const container = document.getElementById('slideshow-track');
    const fullList = [...images, ...images]; // loop the list

    fullList.forEach((filename, i) => {
        const img = document.createElement('img');
        img.src = `slideshow/${filename}`;
        img.alt = `Slide ${i + 1}`;
        img.style.setProperty('--delay', `${i * 0.1}s`);
        container.appendChild(img);
    });
}

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
