/* ---------- State Storage (Requirement 6) ---------- */

let currentStage = 0;
const totalStages = 4;

const formData = {
    name: "",
    email: "",
    password: "",
    age: ""
};

const stages = document.querySelectorAll(".stage");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/* ---------- Navigation ---------- */

function showStage(index) {
    stages.forEach(stage => stage.classList.remove("active"));
    stages[index].classList.add("active");

    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === totalStages - 1 ? "Submit" : "Next";

    updateProgress();
}

function updateProgress() {
    const percent = ((currentStage + 1) / totalStages) * 100;
    progressBar.style.width = percent + "%";
}

/* ---------- Validation Logic (Requirements 1, 2, 5) ---------- */

function validateStage(index) {
    const stage = stages[index];
    const input = stage.querySelector("input");
    const feedback = stage.querySelector(".feedback");
    const value = input.value.trim();

    feedback.textContent = "";

    switch (index) {
        case 0: // Name
            if (value.length < 3) {
                feedback.textContent = "Name must be at least 3 characters";
                return false;
            }
            formData.name = value;
            break;

        case 1: // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                feedback.textContent = "Invalid email format";
                return false;
            }
            formData.email = value;
            break;

        case 2: // Password
            if (value.length < 8) {
                feedback.textContent = "Password must be at least 8 characters";
                return false;
            }
            formData.password = value;
            break;

        case 3: // Age
            if (Number(value) < 18) {
                feedback.textContent = "You must be at least 18 years old";
                return false;
            }
            formData.age = value;
            break;
    }

    return true;
}

/* ---------- Button Handlers ---------- */

nextBtn.addEventListener("click", () => {
    if (!validateStage(currentStage)) return;

    if (currentStage === totalStages - 1) {
        alert("Form submitted successfully!");
        console.log("Collected Data:", formData);
        return;
    }

    currentStage++;
    showStage(currentStage);
});

prevBtn.addEventListener("click", () => {
    currentStage--;
    showStage(currentStage);
});

/* ---------- Initialize ---------- */
showStage(currentStage);
