
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

/* =========================
   DISCOVER PAGE
   ========================= */

const discoverGrid = document.querySelector("#discover-grid");
const visitText = document.querySelector("#visit-text");

/* =========================
   VISIT MESSAGE
   ========================= */

function displayVisitMessage() {
    if (!visitText) return;

    const now = Date.now();
    const lastVisit = Number(localStorage.getItem("lastVisit"));

    if (!lastVisit) {
        visitText.textContent =
            "Welcome! Let us know if you have any questions about Brazzaville.";
    } else {
        const daysSinceVisit = Math.floor(
            (now - lastVisit) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceVisit < 1) {
            visitText.textContent = "Back so soon! Awesome!";
        } else if (daysSinceVisit === 1) {
            visitText.textContent = "You last visited 1 day ago.";
        } else {
            visitText.textContent =
                `You last visited ${daysSinceVisit} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", String(now));
}

/* =========================
   LOAD DISCOVER PLACES
   ========================= */

async function loadPlaces() {
    if (!discoverGrid) return;

    try {
        const response = await fetch("data/places.json");

        if (!response.ok) {
            throw new Error("Could not load places.json");
        }

        const places = await response.json();

        displayPlaces(places);
    } catch (error) {
        console.error("Error loading discover places:", error);

        discoverGrid.innerHTML =
            "<p>Sorry, the places could not be loaded. Please try again later.</p>";
    }
}

/* =========================
   DISPLAY DISCOVER CARDS
   ========================= */

function displayPlaces(places) {
    if (!discoverGrid) return;

    discoverGrid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");

        card.className = `discover-card card-${index + 1}`;

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            alert(`${place.name}\n\n${place.description}`);
        });

        card.append(
            title,
            figure,
            address,
            description,
            button
        );

        discoverGrid.appendChild(card);
    });
}

displayVisitMessage();
loadPlaces();
