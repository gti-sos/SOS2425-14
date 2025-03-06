"use strict";

function menu(){
    const observer = new MutationObserver((mutations, obs) => {
        const menuIconOpen = document.getElementById('menu-icon-open');
        const menuIconClose = document.getElementById('menu-icon-close');
        const menu = document.getElementById('menu');

        if (menuIconOpen && menuIconClose && menu) {
            obs.disconnect(); // Dejar de observar cuando todo esté cargado
            initMenu();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function initMenu() {
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const menu = document.getElementById('menu');
    const body = document.body;

    menuIconOpen.addEventListener('click', function() {
        menu.classList.toggle('show');
        body.classList.toggle('no-scroll');
    });

    menuIconClose.addEventListener('click', function() {
        menu.classList.toggle('show');
        body.classList.toggle('no-scroll');
    });
}

document.addEventListener('DOMContentLoaded', menu);
