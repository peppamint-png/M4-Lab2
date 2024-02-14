document.addEventListener('DOMContentLoaded', function () {
    // CREATE AN ARRAY OF EMPLOYEES
    let employees = [
        { id: 1, name: 'Dan', extension: 2345, email: 'dan@example.com', department: 'Engineering' },
        { id: 2, name: 'Dan 2', extension: 2346, email: 'dan2@example.com', department: 'Finance' },
        { id: 3, name: 'Bob', extension: 2347, email: 'bob@example.com', department: 'Marketing' },
        { id: 4, name: 'Marcus Brownlee', extension: 2348, email: 'marcus@youtube.com', department: 'Product' },
        { id: 5, name: 'Tom Holland', extension: 2349, email: 'thomas@spider.com', department: 'Sales' }
    ];

    // CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
    // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
    if (localStorage.getItem('employees')) {
        employees = JSON.parse(localStorage.getItem('employees'));
    }

    // GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
    const form = document.getElementById('addForm');

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

        // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
        const newEmployee = { id, name, extension, email, department };

        // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
        employees.push(newEmployee);

        // BUILD THE GRID
        buildGrid();

        // RESET THE FORM
        form.reset();

        // SET FOCUS BACK TO THE ID TEXT BOX
        document.getElementById('id').focus();

        // INCREMENT THE NUMBER OF EMPLOYEES IN THE TABLE
        employeeCount++;
        updateEmployeeCountDisplay();
    });

    // BUILD THE EMPLOYEES GRID
    function buildGrid() {
        // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
        const tableBody = document.getElementById('employees').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // LOOP THROUGH THE ARRAY OF EMPLOYEES REBUILDING THE ROW STRUCTURE
        employees.forEach((employee, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = employee.id;
            row.insertCell(1).textContent = employee.name;
            row.insertCell(2).textContent = employee.extension;
            row.insertCell(3).textContent = employee.email;
            row.insertCell(4).textContent = employee.department;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('data-index', index);
            deleteButton.addEventListener('click', function() {
                deleteEmployee(this.getAttribute('data-index'));
            });
            row.insertCell(5).appendChild(deleteButton);
        });

        // UPDATE EMPLOYEE COUNT
        document.getElementById('empCount').textContent = employees.length;

        // STORE THE ARRAY IN STORAGE
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    // DELETE EMPLOYEE
    function deleteEmployee(index) {
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(index, 1);

        // BUILD THE GRID
        buildGrid();
    }

    buildGrid(); // Call buildGrid to populate table initially
});