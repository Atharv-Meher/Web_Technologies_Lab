/* ---------- Question Configuration (Requirement 1) ---------- */

const questions = [
    {
        id: "q1",
        text: "What is your name?",
        type: "text",
        required: true,
        maxLength: 30
    },
    {
        id: "q2",
        text: "Select your gender",
        type: "radio",
        required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        id: "q3",
        text: "Which technologies do you use?",
        type: "checkbox",
        required: true,
        options: ["JavaScript", "Python", "Java", "C++"],
        minSelect: 1,
        maxSelect: 2
    }
];

const form = document.getElementById("surveyForm");

/* ---------- DOM Generation (Requirement 2) ---------- */

function generateSurvey() {
    questions.forEach(q => {
        const container = document.createElement("div");
        container.className = "question";
        container.id = q.id;

        const label = document.createElement("label");
        label.textContent = q.text;
        container.appendChild(label);

        if (q.type === "text") {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = q.maxLength;
            container.appendChild(input);
        }

        if (q.type === "radio" || q.type === "checkbox") {
            const optionsDiv = document.createElement("div");
            optionsDiv.className = "options";

            q.options.forEach(opt => {
                const optLabel = document.createElement("label");
                const input = document.createElement("input");
                input.type = q.type;
                input.name = q.id;
                input.value = opt;

                optLabel.appendChild(input);
                optLabel.append(opt);
                optionsDiv.appendChild(optLabel);
            });

            container.appendChild(optionsDiv);
        }

        const feedback = document.createElement("div");
        feedback.className = "feedback";
        container.appendChild(feedback);

        form.appendChild(container);
    });
}

/* ---------- Validation Logic (Requirements 3, 4, 5) ---------- */

function validateQuestion(q) {
    const container = document.getElementById(q.id);
    const feedback = container.querySelector(".feedback");
    feedback.textContent = "";

    if (q.type === "text") {
        const input = container.querySelector("input");
        const value = input.value.trim();

        if (q.required && !value) {
            feedback.textContent = "This field is required";
            input.classList.add("error");
            return false;
        }

        if (value.length > q.maxLength) {
            feedback.textContent = "Character limit exceeded";
            input.classList.add("error");
            return false;
        }

        input.classList.remove("error");
    }

    if (q.type === "radio") {
        const checked = container.querySelector("input:checked");
        if (q.required && !checked) {
            feedback.textContent = "Please select one option";
            return false;
        }
    }

    if (q.type === "checkbox") {
        const checked = container.querySelectorAll("input:checked").length;

        if (checked < q.minSelect || checked > q.maxSelect) {
            feedback.textContent =
                `Select between ${q.minSelect} and ${q.maxSelect} options`;
            return false;
        }
    }

    return true;
}

/* ---------- Form Validation (Requirement 6) ---------- */

function validateForm() {
    let valid = true;

    questions.forEach(q => {
        if (!validateQuestion(q)) {
            valid = false;
        }
    });

    return valid;
}

/* ---------- Submission Handling ---------- */

document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        alert("Please fix validation errors before submitting.");
        return;
    }

    alert("Survey submitted successfully!");
});

/* ---------- Initialize ---------- */
generateSurvey();
