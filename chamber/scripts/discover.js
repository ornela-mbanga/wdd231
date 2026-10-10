import { discoverPlaces } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

// Create the cards
function displayPlaces(places) {
    discoverGrid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.classList.add(`card-${index + 1}`);

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img 
                    src="${place.image}" 
                    alt="${place.name}"
                    width="300"
                    height="200"
                    loading="lazy"
                >
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button type="button">Learn More</button>
        `;

        discoverGrid.appendChild(card);
    });
}

displayPlaces(discoverPlaces);


// -------------------------
// LAST VISIT
// -------------------------

const visitText = document.querySelector("#visit-text");

const currentTime = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

    visitText.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference = currentTime - Number(lastVisit);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysBetween = Math.floor(
        timeDifference / millisecondsPerDay
    );

    if (timeDifference < millisecondsPerDay) {

        visitText.textContent =
            "Back so soon! Awesome!";

    } else if (daysBetween === 1) {

        visitText.textContent =
            "You last visited 1 day ago.";

    } else {

        visitText.textContent =
            `You last visited ${daysBetween} days ago.`;
    }
}

// Save current visit
localStorage.setItem("lastVisit", currentTime);


// -------------------------
// MOBILE NAVIGATION
// -------------------------

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});