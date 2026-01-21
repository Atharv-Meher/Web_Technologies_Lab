const form = document.getElementById("registrationForm");
const roleSelect = document.getElementById("role");
const skillsContainer = document.getElementById("skillsContainer");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");

const emailFeedback = document.getElementById("emailFeedback");
const passwordFeedback = document.getElementById("passwordFeedback");
const confirmFeedback = document.getElementById("confirmFeedback");

/* ---------- Utility Functions ---------- */

function setInvalid(input, feedbackEl, message) {
    input.classList.add("error");
    input.classList.remove("success");
    feedbackEl.textContent = message;
}

function setValid(input, feedbackEl) {
    input.classList.remove("error");
    input.classList.add("success");
    feedbackEl.textContent = "";
}

/* ---------- Email Validation ---------- */

function validateEmail(role) {
    const email = emailInput.value;
    const domainRules = {
    student: [/\.edu$/, /\.com$/, /\.co\.in$/],
    teacher: [/\.school\.org$/, /\.com$/, /\.co\.in$/],
    admin: [/\.admin\.org$/, /\.com$/, /\.co\.in$/]
    };

    if (!domainRules[role]?.test(email)) {
        setInvalid(emailInput, emailFeedback, "Invalid email domain for selected role");
        return false;
    }

    setValid(emailInput, emailFeedback);
    return true;
}

/* ---------- Password Validation ---------- */

function validatePassword(role) {
    const pwd = passwordInput.value;
    let regex;

    if (role === "student") {
        regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    } else if (role === "teacher") {
        regex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    } else if (role === "admin") {
        regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;
    }

    if (!regex?.test(pwd)) {
        setInvalid(passwordInput, passwordFeedback, "Password does not meet role requirements");
        return false;
    }

    setValid(passwordInput, passwordFeedback);
    return true;
}

/* ---------- Confirm Password ---------- */

function validateConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        setInvalid(confirmPasswordInput, confirmFeedback, "Passwords do not match");
        return false;
    }
    setValid(confirmPasswordInput, confirmFeedback);
    return true;
}

/* ---------- Age Validation ---------- */

function validateAge(role) {
    const age = parseInt(ageInput.value);
    const ageLimits = { student: 13, teacher: 21, admin: 25 };

    return age >= ageLimits[role];
}

/* ---------- Role Change Handling ---------- */

roleSelect.addEventListener("change", () => {
    const role = roleSelect.value;

    if (role === "student") {
        skillsContainer.classList.add("hidden");
    } else {
        skillsContainer.classList.remove("hidden");
    }
});

/* ---------- Real-Time Validation ---------- */

emailInput.addEventListener("input", () => validateEmail(roleSelect.value));
passwordInput.addEventListener("input", () => validatePassword(roleSelect.value));
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

/* ---------- Form Submission ---------- */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = roleSelect.value;

    const isValid =
        validateEmail(role) &&
        validatePassword(role) &&
        validateConfirmPassword() &&
        validateAge(role);

    if (!isValid) {
        alert("Please fix validation errors before submitting.");
        return;
    }

    alert("Registration successful!");
});
