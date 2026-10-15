document.addEventListener("DOMContentLoaded", () => {
    const result = document.querySelector("#form-result");

    if (!result) return;

    const parameters = new URLSearchParams(window.location.search);

    const fields = [
        ["First name", "firstName"],
        ["Last name", "lastName"],
        ["Email", "email"],
        ["Subject", "subject"],
        ["Message", "message"]
    ];

    const hasFormData = fields.some(([, key]) =>
        parameters.has(key)
    );

    result.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = hasFormData
        ? "Thank you for contacting ORVY!"
        : "No form information found";

    result.appendChild(heading);

    if (!hasFormData) {
        const message = document.createElement("p");
        message.textContent =
            "Please return to the contact page and complete the form.";
        result.appendChild(message);
        return;
    }

    const introduction = document.createElement("p");
    introduction.textContent =
        "Here is a summary of the information you submitted:";
    result.appendChild(introduction);

    const list = document.createElement("dl");

    fields.forEach(([label, key]) => {
        if (!parameters.has(key)) return;

        const term = document.createElement("dt");
        term.textContent = label;

        const description = document.createElement("dd");
        description.textContent = parameters.get(key) || "Not provided";

        list.appendChild(term);
        list.appendChild(description);
    });

    result.appendChild(list);

    const backLink = document.createElement("a");
    backLink.href = "contact.html";
    backLink.className = "button";
    backLink.textContent = "Return to Contact";
    result.appendChild(backLink);
});
