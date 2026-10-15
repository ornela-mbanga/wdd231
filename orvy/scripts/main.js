import { displayCurrentYear } from "./utils.js";

displayCurrentYear();
const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const modifiedElement = document.getElementById("last-modified");

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
} else {
    console.warn("Element #last-modified not found.");
}

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
} else {
    console.warn("Menu button or navigation is not available.");
}