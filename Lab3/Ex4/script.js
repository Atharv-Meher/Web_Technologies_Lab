/* ---------- Activity Storage (Requirement 2) ---------- */

let activityLog = [];
let clickCount = 0;

/* ---------- Configuration ---------- */

const CLICK_THRESHOLD = 10;
const activityContainer = document.getElementById("activityLog");
const warningEl = document.getElementById("warning");

/* ---------- Utility ---------- */

function logActivity(type, target, phase) {
    const entry = {
        type,
        target,
        phase,
        time: new Date().toLocaleTimeString()
    };

    activityLog.push(entry);
    renderLog();
}

/* ---------- Event Handlers (Requirements 1 & 3) ---------- */

function handleClick(event) {
    clickCount++;
    logActivity("click", event.target.tagName, event.eventPhase);

    if (clickCount >= CLICK_THRESHOLD) {
        warningEl.textContent = "Warning: Excessive clicking detected!";
    }
}

function handleKeyPress(event) {
    logActivity("keypress", event.key, event.eventPhase);
}

function handleFocus(event) {
    logActivity("focus", event.target.tagName, event.eventPhase);
}

/* ---------- Attach Listeners (Capturing + Bubbling) ---------- */

document.addEventListener("click", handleClick, true);   // Capturing
document.addEventListener("click", handleClick, false);  // Bubbling

document.addEventListener("keydown", handleKeyPress, true);
document.addEventListener("focusin", handleFocus, false);

/* ---------- DOM Rendering (Requirement 4) ---------- */

function renderLog() {
    activityContainer.innerHTML = "";

    activityLog.slice(-50).forEach(entry => {
        const div = document.createElement("div");
        div.className = "log-entry";

        div.textContent =
            `[${entry.time}] ${entry.type.toUpperCase()} | ` +
            `Target: ${entry.target} | Phase: ${entry.phase}`;

        activityContainer.appendChild(div);
    });
}

/* ---------- Reset & Export (Requirement 6) ---------- */

document.getElementById("resetBtn").addEventListener("click", () => {
    activityLog = [];
    clickCount = 0;
    warningEl.textContent = "";
    renderLog();
});

document.getElementById("exportBtn").addEventListener("click", () => {
    const formattedLog = activityLog
        .map(e =>
            `${e.time} - ${e.type.toUpperCase()} - Target: ${e.target} - Phase: ${e.phase}`
        )
        .join("\n");

    alert(formattedLog || "No activity to export");
});
