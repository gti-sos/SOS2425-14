"use strict";

function menu() {
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