const form = document.querySelector('.employees-form');
const userContainer = document.querySelector('.added-user');
const statusMessage = document.querySelector('.status-message');
let employees = [];

updateEmptyMessage();

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = form.querySelector('#name').value;
  const profession = form.querySelector('#profession').value;
  const age = form.querySelector('#age').value;

  if (name.trim() === '' || profession.trim() === '' || age.trim() === '') {
    displayErrorMessage('Error: Please make sure all fields are filled before adding an employee.');
  } else {
    const employee = {
      id: generateUniqueId(),
      name: name,
      profession: profession,
      age: age
    };

    employees.push(employee);
    addUser(employee);
    clearForm();
    displaySuccessMessage('Success: Employee added successfully.');
    updateEmptyMessage();
  }
});

function generateUniqueId() {
    const lastEmployee = employees[employees.length - 1];
  if (lastEmployee) {
    return lastEmployee.id + 1;
  } else {
    return 1;
  }
}

function addUser(employee) {
  const div = document.createElement('div');
  div.className = 'user-entry';

  const para = document.createElement('p');
  para.textContent = `${employee.id}          Name: ${employee.name}   Profession: ${employee.profession}   Age: ${employee.age}`;
  
  const span = document.createElement('span');
  span.className = 'delete';
  span.innerText = 'Delete User';

  div.appendChild(para);
  div.appendChild(span);

  userContainer.appendChild(div);

  span.addEventListener('click', function() {
    const index = employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      employees.splice(index, 1);
      div.remove();
      updateEmptyMessage();
    }
  });
}

function displayErrorMessage(message) {
  statusMessage.textContent = message;
  statusMessage.style.color = '#FF4343';
}

function displaySuccessMessage(message) {
  statusMessage.textContent = message;
  statusMessage.style.color = '#43FF78';
}

function clearForm() {
  form.querySelector('#name').value = '';
  form.querySelector('#profession').value = '';
  form.querySelector('#age').value = '';
}

function updateEmptyMessage() {
  const emptyMessage = document.querySelector('.empty-message');
  if (employees.length === 0) {
    if (!emptyMessage) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'You have 0 Employees.';
      userContainer.appendChild(emptyMessage);
    }
  } else {
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
  const updatedEmptyMessage = document.querySelector('.empty-message');
  if (updatedEmptyMessage) {
    updatedEmptyMessage.textContent = `You have ${employees.length} Employee${employees.length === 1 ? '' : 's'}.`;
  }
}
