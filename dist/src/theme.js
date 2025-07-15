function setTheme(theme) {
    const root = document.documentElement;
    root.classList.remove('theme-pink', 'theme-frog');
    document.body.classList.add('theme-transition');
    if (theme === 'pink') {
        root.classList.add('theme-pink');
        localStorage.setItem('theme', 'pink');
    } else if (theme === 'frog') {
        root.classList.add('theme-frog');
        localStorage.setItem('theme', 'frog');
    } else {
        localStorage.removeItem('theme');
    }
    // remove transition class after delay
    setTimeout(()=>{
        document.body.classList.remove('theme-transition');
    }, 500);
}

//# sourceMappingURL=theme.js.map