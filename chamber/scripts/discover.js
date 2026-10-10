
import { discoverPlaces } from "../data/discover.mjs";

// -------------------------
// DISCOVER PLACES
// -------------------------

const discoverGrid = document.querySelector("#discover-grid");

function displayPlaces(places) {
    if (!discoverGrid) {
        console.error("The discover-grid element was not found.");
        return;
    }

    discoverGrid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card", `card-${index + 1}`);

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = place.image;
        image.alt = place.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        // Learn More button action
        button.addEventListener("click", () => {
            alert(
                `${place.name}\n\nAddress: ${place.address}\n\n${place.description}`
            );
        });

        card.append(title, figure, address, description, button);
        discoverGrid.appendChild(card);
    });
}

displayPlaces(discoverPlaces);


// -------------------------
// LAST VISIT
// -------------------------

const visitText = document.querySelector("#visit-text");

if (visitText) {
    const currentTime = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (!lastVisit) {
        visitText.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentTime - Number(lastVisit);
        const daysBetween = Math.floor(
            timeDifference / millisecondsPerDay
        );

        if (daysBetween < 1) {
            visitText.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitText.textContent = "You last visited 1 day ago.";
        } else {
            visitText.textContent =
                `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", String(currentTime));
}


// -------------------------
// MOBILE NAVIGATION
// -------------------------

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
} else {
    console.error(
        "Menu button or navigation not found. Check discover.html IDs."
    );
}


