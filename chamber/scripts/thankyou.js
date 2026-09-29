const params = new URLSearchParams(window.location.search);

document.querySelector("#first-name").textContent =
    params.get("firstName") || "";

document.querySelector("#last-name").textContent =
    params.get("lastName") || "";

document.querySelector("#email").textContent =
    params.get("email") || "";

document.querySelector("#phone").textContent =
    params.get("phone") || "";

document.querySelector("#organization").textContent =
    params.get("organization") || "";

document.querySelector("#timestamp").textContent =
    params.get("timestamp") || "";