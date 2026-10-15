document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector("#product-grid");
    if (!productGrid) return;

    const searchInput = document.querySelector("#product-search");
    const categoryFilter = document.querySelector("#category-filter");
    const sortSelect = document.querySelector("#sort-products");
    const productCount = document.querySelector("#product-count");
    const emptyMessage = document.querySelector("#empty-message");
    const modal = document.querySelector("#product-modal");
    const modalContent = document.querySelector("#modal-content");
    const modalClose = document.querySelector("#modal-close");

    const FAVORITES_KEY = "orvy-favorites";
    let products = [];
    let favorites = [];

    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        products = await response.json();

        if (!Array.isArray(products)) {
            throw new Error("The JSON file must contain an array of products.");
        }

        console.log("ORVY products loaded:", products.length);
    } catch (error) {
        console.error("ORVY: Could not load products.", error);
        productGrid.replaceChildren();

        if (emptyMessage) {
            emptyMessage.hidden = false;
            emptyMessage.textContent =
                "Products could not be loaded. Please try again later.";
        }

        if (productCount) {
            productCount.textContent = "Products unavailable";
        }

        return;
    }

    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));

        if (Array.isArray(saved)) {
            favorites = saved.map(String);
        }
    } catch (error) {
        console.warn("ORVY: Could not load favorites.", error);
    }

    function createProductCard(product) {
        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.id = String(product.id);
        card.dataset.name = product.name;
        card.dataset.category = product.category;
        card.dataset.price =
            product.price === null || product.price === undefined
                ? ""
                : String(product.price);

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const heading = document.createElement("h3");
        heading.textContent = product.name;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description || "";

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent =
            product.price === null || product.price === undefined
                ? "Price on request"
                : `${Number(product.price).toLocaleString()} XAF`;

        const detailsButton = document.createElement("button");
        detailsButton.type = "button";
        detailsButton.className = "product-details";
        detailsButton.dataset.product = String(product.id);
        detailsButton.textContent = "View Details";

        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.className = "favorite-button";
        favoriteButton.dataset.favorite = String(product.id);

        card.append(
            image,
            heading,
            description,
            price,
            detailsButton,
            favoriteButton
        );

        return card;
    }

    productGrid.replaceChildren(
        ...products.map(createProductCard)
    );

    function getPrice(card) {
        const rawPrice = card.dataset.price;

        if (!rawPrice || rawPrice.trim() === "") {
            return null;
        }

        const price = Number(rawPrice);

        return Number.isFinite(price) && price >= 0
            ? price
            : null;
    }

    function saveFavorites() {
        try {
            localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favorites)
            );
        } catch (error) {
            console.warn("ORVY: Could not save favorites.", error);
        }
    }

    function updateFavoriteButtons() {
        productGrid.querySelectorAll(".favorite-button").forEach((button) => {
            const id = String(button.dataset.favorite);
            const isFavorite = favorites.includes(id);

            button.setAttribute("aria-pressed", String(isFavorite));
            button.textContent = isFavorite
                ? "♥ Saved to Favorites"
                : "♡ Add to Favorites";
        });
    }

    function updateProducts() {
        const cards = Array.from(
            productGrid.querySelectorAll(".product-card")
        );

        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedCategory = categoryFilter
            ? categoryFilter.value
            : "all";

        const sortMode = sortSelect
            ? sortSelect.value
            : "default";

        let visibleCards = cards.filter((card) => {
            const text = (
                (card.dataset.name || "") +
                " " +
                card.textContent
            ).toLowerCase();

            const matchesSearch = text.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (sortMode === "name") {
            visibleCards.sort((a, b) =>
                (a.dataset.name || "").localeCompare(b.dataset.name || "")
            );
        } else if (
            sortMode === "price-low" ||
            sortMode === "price-high"
        ) {
            visibleCards.sort((a, b) => {
                const priceA = getPrice(a);
                const priceB = getPrice(b);

                if (priceA === null && priceB === null) return 0;
                if (priceA === null) return 1;
                if (priceB === null) return -1;

                return sortMode === "price-low"
                    ? priceA - priceB
                    : priceB - priceA;
            });
        } else {
            visibleCards.sort(
                (a, b) => Number(a.dataset.id) - Number(b.dataset.id)
            );
        }

        cards.forEach((card) => {
            card.hidden = !visibleCards.includes(card);
        });

        visibleCards.forEach((card) => productGrid.appendChild(card));

        if (productCount) {
            productCount.textContent =
                `${visibleCards.length} product` +
                `${visibleCards.length === 1 ? "" : "s"} found`;
        }

        if (emptyMessage) {
            emptyMessage.hidden = visibleCards.length !== 0;
        }
    }

    function openProductDetails(card) {
        if (!modal || !modalContent) return;

        modalContent.replaceChildren();

        const image = card.querySelector("img");
        const heading = card.querySelector("h3");
        const description = card.querySelector(".product-description");
        const price = card.querySelector(".product-price");

        if (image) {
            const modalImage = document.createElement("img");
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalContent.appendChild(modalImage);
        }

        const title = document.createElement("h2");
        title.id = "modal-title";
        title.textContent = heading
            ? heading.textContent
            : "ORVY Product";

        modalContent.appendChild(title);

        if (price) {
            const modalPrice = document.createElement("p");
            modalPrice.textContent = price.textContent;
            modalContent.appendChild(modalPrice);
        }

        if (description) {
            const modalDescription = document.createElement("p");
            modalDescription.textContent = description.textContent;
            modalContent.appendChild(modalDescription);
        }

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            console.error("ORVY: Dialogs are not supported by this browser.");
        }
    }


    productGrid.addEventListener("click", (event) => {
        const detailsButton = event.target.closest(".product-details");
        const favoriteButton = event.target.closest(".favorite-button");

        if (detailsButton) {
            const productId = String(detailsButton.dataset.product);

            const card = Array.from(
                productGrid.querySelectorAll(".product-card")
            ).find((item) => String(item.dataset.id) === productId);

            if (card) {
                openProductDetails(card);
            }
        }

        if (favoriteButton) {
            const id = String(favoriteButton.dataset.favorite);

            if (favorites.includes(id)) {
                favorites = favorites.filter((item) => item !== id);
            } else {
                favorites.push(id);
            }

            saveFavorites();
            updateFavoriteButtons();
        }
    });

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => modal.close());
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", updateProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", updateProducts);

        const requestedCategory =
            new URLSearchParams(window.location.search).get("category");

        if (
            requestedCategory &&
            Array.from(categoryFilter.options).some(
                (option) => option.value === requestedCategory
            )
        ) {
            categoryFilter.value = requestedCategory;
        }
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", updateProducts);
    }

    updateFavoriteButtons();
    updateProducts();
});
