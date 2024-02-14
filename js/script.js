document.addEventListener('DOMContentLoaded', function () {
    // GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
    const form = document.getElementById('addForm');
    const employeeTable = document.getElementById('employees');

    // SET A COUNT VARIABLE TO DISPLAY NEXT TO EMPLOYEES HEADER
    let employeeCount = 0;

    // ADD EMPLOYEE
    form.addEventListener('submit', (e) => {
        // PREVENT FORM SUBMISSION
        e.preventDefault();

        // GET THE VALUES FROM THE TEXT BOXES
        const employeeId = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const extension = document.getElementById('extension').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;

        // INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
        const row = employeeTable.insertRow();

        // INSERT A CELL FOR EACH ITEM WITHIN THE NEW ROW
        row.insertCell().appendChild(document.createTextNode(employeeId));
        row.insertCell().appendChild(document.createTextNode(name));
        row.insertCell().appendChild(document.createTextNode(extension));
        row.insertCell().appendChild(document.createTextNode(email));
        row.insertCell().appendChild(document.createTextNode(department));

        // CREATE THE DELETE BUTTON
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this employee?')) {
                employeeTable.deleteRow(row.rowIndex);
                employeeCount--;
                updateEmployeeCountDisplay();
            }
        });
        deleteCell.appendChild(deleteButton);

        // RESET THE FORM
        form.reset();

        // SET FOCUS BACK TO THE ID TEXT BOX
        document.getElementById('id').focus();

        // INCREMENT THE NUMBER OF EMPLOYEES IN THE TABLE
        employeeCount++;
        updateEmployeeCountDisplay();
    });

    function updateEmployeeCountDisplay() {
        document.getElementById('empCount').textContent = employeeCount;
    }
});

// DELETE EMPLOYEE
