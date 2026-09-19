const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.json");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error(error);

        membersContainer.innerHTML =
            "<p>Sorry, the business directory could not be loaded.</p>";
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.className = "member-card";

        card.innerHTML = `
            <div class="member-logo">
                <img src="images/${member.image}" alt="${member.name} logo">
            </div>

            <div class="member-info">

                <h2>${member.name}</h2>

                <p>${member.description}</p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${getMembershipLevel(member.membership)}
                </p>

                <p>
                    <a href="${member.website}" target="_blank" rel="noopener">
                        Visit Website
                    </a>
                </p>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}


function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

});



listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

});


loadMembers();