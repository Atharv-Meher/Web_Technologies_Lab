let students = [];

const table = document.getElementById("studentTable");
const form = document.getElementById("studentForm");
const message = document.getElementById("message");

const idField = document.getElementById("studentId");
const nameField = document.getElementById("name");
const deptField = document.getElementById("department");
const marksField = document.getElementById("marks");

let editMode = false;


// Show message with HTTP status simulation
function showMessage(text, type, status) {

    message.textContent = `${text} (Status: ${status})`;
    message.className = type;
}


// READ operation
async function loadStudents() {

    try {

        const response = await fetch("students.json");

        if (!response.ok)
            throw new Error("404");

        const data = await response.json();

        students = data.students;

        renderTable();

        showMessage("Students loaded successfully", "success", 200);

    } catch {

        showMessage("Failed to load students", "error", 500);
    }
}


// Render table dynamically
function renderTable() {

    table.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>
                <button class="edit" onclick="editStudent('${student.id}')">
                Edit
                </button>

                <button class="delete" onclick="deleteStudent('${student.id}')">
                Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// CREATE or UPDATE
form.addEventListener("submit", function(e) {

    e.preventDefault();

    const student = {

        id: idField.value,
        name: nameField.value,
        department: deptField.value,
        marks: marksField.value
    };

    if (editMode) {

        updateStudent(student);

    } else {

        createStudent(student);
    }

    form.reset();
});


// CREATE
function createStudent(student) {

    const exists = students.find(s => s.id === student.id);

    if (exists) {

        showMessage("Student ID already exists", "error", 404);
        return;
    }

    students.push(student);

    renderTable();

    showMessage("Student added successfully", "success", 200);
}


// EDIT
function editStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) {

        showMessage("Student not found", "error", 404);
        return;
    }

    idField.value = student.id;
    nameField.value = student.name;
    deptField.value = student.department;
    marksField.value = student.marks;

    editMode = true;
}


// UPDATE
function updateStudent(updatedStudent) {

    const index = students.findIndex(s => s.id === updatedStudent.id);

    if (index === -1) {

        showMessage("Student not found", "error", 404);
        return;
    }

    students[index] = updatedStudent;

    editMode = false;

    renderTable();

    showMessage("Student updated successfully", "success", 200);
}


// DELETE
function deleteStudent(id) {

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {

        showMessage("Student not found", "error", 404);
        return;
    }

    students.splice(index, 1);

    renderTable();

    showMessage("Student deleted successfully", "success", 200);
}


// Initialize
loadStudents();
