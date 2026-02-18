const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const spinner = document.getElementById("spinner");
const form = document.getElementById("registrationForm");

let usernameAvailable = false;

usernameInput.addEventListener("input", () => {

    const username = usernameInput.value.trim().toLowerCase();

    if (username.length < 3) {

        feedback.textContent = "";
        spinner.style.display = "none";
        return;
    }

    spinner.style.display = "block";
    feedback.textContent = "";

    fetch("users.json")

    .then(response => response.json())

    .then(data => {

        spinner.style.display = "none";

        if (data.usernames.includes(username)) {

            feedback.textContent = "Username already taken";
            feedback.className = "taken";
            usernameAvailable = false;

        } else {

            feedback.textContent = "Username available";
            feedback.className = "available";
            usernameAvailable = true;
        }

    })

    .catch(() => {

        spinner.style.display = "none";
        feedback.textContent = "Error checking username";
        feedback.className = "taken";
    });

});


form.addEventListener("submit", (e) => {

    if (!usernameAvailable) {

        e.preventDefault();
        alert("Username unavailable. Choose another.");

    } else {

        alert("Registration successful!");
    }

});
