"use strict";

function navbar(){
    const observer = new MutationObserver((mutations, obs) => {
        const navbarElement = document.getElementById('navbar');
        const samplesLink = document.getElementById('samples-link');
        const dropdown = document.querySelector('.dropdown');

        if (navbarElement && samplesLink && dropdown) {
            obs.disconnect(); // Dejar de observar cuando se encuentre todo
            initNavbar();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const samplesLink = document.getElementById('samples-link');
    const dropdown = document.querySelector('.dropdown');

    if (samplesLink && dropdown) {
        samplesLink.addEventListener('click', function(event) {
            event.preventDefault();
            dropdown.classList.toggle('show');
        });
    }
}

document.addEventListener('DOMContentLoaded', navbar);
