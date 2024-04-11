// arrays of objects
var moduleInfo = [];
var taskInfo = [];
var toDoList = [];

// global variable to capture a control value in one function so I can use it in another
var idToRetrieveDueDate;

function addModuleInfo(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get form values
  var moduleCode = document.getElementById('code').value;
  var moduleLecturer = document.getElementById('lecturer').value;
  
  // Create a new object with form values
  var moduleToAdd = {
    code: moduleCode,
    lecturer: moduleLecturer,
  };

  // Push the new data object into the dataArray
  moduleInfo.push(moduleToAdd);

  // Clear the form fields
  document.getElementById('code').value = '';
  document.getElementById('lecturer').value = '';

  // Update the displayed list
  displayModuleInfo();
  populateDropdowns();
}

function displayModuleInfo() {
    var tableBody = document.getElementById('moduleinfotablebody');
    tableBody.innerHTML = ''; // Clear previous table rows
  
    // Create and add table rows for each data object in the dataArray
    moduleInfo.forEach(data => {
      var row = tableBody.insertRow();
      
      var moduleCodeCell = row.insertCell();
      var moduleLecturerCell = row.insertCell();
  
      moduleCodeCell.textContent = data.code;
      moduleLecturerCell.textContent = data.lecturer;
    });  
}

function addTaskInfo(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form values
    var taskName = document.getElementById('taskname').value;
    var taskDueDate = document.getElementById('duedate').value;

    // Create a new object with form values
    var taskToAdd = {
        taskname: taskName,
        duedate: taskDueDate,
        id: Date.now()
    };
  
    // Push the new data object into the dataArray
    taskInfo.push(taskToAdd);
  
    // Clear the form fields
    document.getElementById('taskname').value = '';
    document.getElementById('duedate').value = '';
  
    // Update the displayed list
    displayTaskInfo();
    populateDropdowns();
}

function displayTaskInfo() {
    var tableBody = document.getElementById('taskinfotablebody');
    tableBody.innerHTML = ''; // Clear previous table rows
  
    // Create and add table rows for each data object in the dataArray
    taskInfo.forEach(data => {
      var row = tableBody.insertRow();
      
      var taskNameCell = row.insertCell();
      var taskDueDateCell = row.insertCell();
  
      taskNameCell.textContent = data.taskname;
      taskDueDateCell.textContent = data.duedate;
    });  
}

function populateDropdowns() {
    // Clear existing options in modulecode dropdown
    var moduleCodeDropdown = document.getElementById('modulecode');
    moduleCodeDropdown.innerHTML = '';

    // Populate modulecode dropdown
    moduleInfo.forEach(data => {
        var moduleCodeDropdownOption = document.createElement("option");
            moduleCodeDropdownOption.value = data.code;
            moduleCodeDropdownOption.text = data.code;

        moduleCodeDropdown.appendChild(moduleCodeDropdownOption);
    })

    // Clear existing options in tasktodo dropdown
    var taskNameDropdown = document.getElementById('tasktodo');
    taskNameDropdown.innerHTML = '';

    // Populate tasktodo dropdown
    for (var i = 0; i < taskInfo.length; i++) {
        taskNameDropdown.innerHTML += `<option value="${taskInfo[i].id}">${taskInfo[i].taskname}</option>`;

        // capture the value of the dynamically created and populated dropdown option
        idToRetrieveDueDate = document.getElementById('tasktodo').value;
    }
}

function addToDoListInfo(event) {
    event.preventDefault(); 
    
    // Get form values
    var toDoItemModuleCode = document.getElementById('modulecode').value;
    var toDoItemTaskNameElement = document.getElementById('tasktodo');
    var toDoItemTaskName = toDoItemTaskNameElement.options[toDoItemTaskNameElement.selectedIndex].text;
    var toDoItemDescription = document.getElementById('description').value;

    // Create a new object with form values
    var toDoItemToAdd = {
        modulecode: toDoItemModuleCode,
        taskname: toDoItemTaskName,
        description: toDoItemDescription,
        id: Date.now()
    };
  
    // Push the new data object into the dataArray
    toDoList.push(toDoItemToAdd);
  
    // Clear the form fields
    document.getElementById('modulecode').value = '';
    document.getElementById('tasktodo').selectedIndex = 0;
    document.getElementById('description').value = '';
  
    // Update the displayed list
    displayToDoListInfo();
}

function displayToDoListInfo() {
    var tableBody = document.getElementById('todolisttabletbody');
    tableBody.innerHTML = ''; // Clear previous table rows
  
    // Create and add table rows for each data object in the dataArray
    toDoList.forEach(data => {
      var row = tableBody.insertRow();
      
      var toDoItemModuleCodeCell = row.insertCell();
      var toDoItemTaskNameCell = row.insertCell();
      var toDoItemDescriptionCell = row.insertCell();
      var toDoItemDueDateCell = row.insertCell();

      toDoItemModuleCodeCell.textContent = data.modulecode;
      toDoItemTaskNameCell.textContent = data.taskname;
      toDoItemDescriptionCell.textContent = data.description;
      
        // foreach task in the tasks array if its id is the same as the value of the dynamically created and populated dropdown option
      taskInfo.forEach(task => {
        if(task.id == idToRetrieveDueDate){
            // get the due date of that task
            toDoItemDueDateCell.textContent = task.duedate;
        }
      })
    });  
}

// Add form submission event listener
var moduleInfoForm = document.getElementById('moduleinfoform');
moduleInfoForm.addEventListener('submit', addModuleInfo);

var taskInfoForm = document.getElementById('taskinfoform');
taskInfoForm.addEventListener('submit', addTaskInfo);

var toDoListInfoForm = document.getElementById('todolistform');
toDoListInfoForm.addEventListener('submit', addToDoListInfo)
