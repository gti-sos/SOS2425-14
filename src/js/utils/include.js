"use strict";

async function include(htmlFile, selector) {
    try {
        let response = await fetch(htmlFile);
        if (response.ok) {
            let htmlContent = await response.text();
            document.querySelector(selector).innerHTML += htmlContent;
        } else {
            console.error(htmlFile + " does not exist");
        }
    } catch (error) {
        console.error("Error fetching " + htmlFile + ": ", error);
    }
}