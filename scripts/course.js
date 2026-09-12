const courses = [
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        type: "WDD",
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        type: "WDD",
        completed: true
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development",
        credits: 2,
        type: "WDD",
        completed: false
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        type: "CSE",
        completed: true
    },
    {
        code: "CSE 110",
        name: "Introduction to programming",
        credits: 2,
        type: "CSE",
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming whith classes",
        credits: 2,
        type: "CSE",
        completed: true
    }
    

];


const courseContainer =
    document.querySelector("#course-container");

const totalCredits =
    document.querySelector("#total-credits");

const allButton =
    document.querySelector("#all-courses");

const cseButton =
    document.querySelector("#cse-courses");

const wddButton =
    document.querySelector("#wdd-courses");


function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    let credits = 0;

    courseList.forEach((course) => {

        credits += course.credits;

        const card =
            document.createElement("article");

        card.classList.add("course-card");


        if (course.completed) {

            card.classList.add("completed");

        }


        const title =
            document.createElement("h3");

        title.textContent = course.code;


        const name =
            document.createElement("p");

        name.textContent = course.name;


        const credit =
            document.createElement("p");

        credit.textContent =
            `${course.credits} credits`;


        card.appendChild(title);

        card.appendChild(name);

        card.appendChild(credit);

        courseContainer.appendChild(card);
    });


    totalCredits.textContent = credits;
}


/* ALL */

allButton.addEventListener("click", () => {

    displayCourses(courses);

});


/* CSE */

cseButton.addEventListener("click", () => {

    const cseCourses =
        courses.filter(
            (course) => course.type === "CSE"
        );

    displayCourses(cseCourses);

});


/* WDD */

wddButton.addEventListener("click", () => {

    const wddCourses =
        courses.filter(
            (course) => course.type === "WDD"
        );

    displayCourses(wddCourses);

});




displayCourses(courses);