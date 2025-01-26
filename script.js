const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const languageSelect = document.getElementById('languageSelect');
let tasks = [];
let currentLanguage = 'ar';

languageSelect.addEventListener('change', function () {
    currentLanguage = this.value;
    updateLanguage();
});

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    const task = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        dueDate: new Date(taskDueDate),
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
    addTaskNotification(task);
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `list-group-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <h5>${task.name} - <span class="badge badge-${getBadgeClass(task.priority)}">${task.priority}</span></h5>
                <p>${task.description}</p>
                <small>${languages[currentLanguage].taskDueDatePlaceholder}: ${task.dueDate.toDateString()}</small>
            </div>
            <div>
                <button class="btn btn-success btn-sm" onclick="toggleTask(${index})">${languages[currentLanguage].completeButton}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">${languages[currentLanguage].deleteButton}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function getBadgeClass(priority) {
    switch (priority) {
        case languages[currentLanguage].taskPriorities.high:
            return 'danger';
        case languages[currentLanguage].taskPriorities.medium:
            return 'warning';
        case languages[currentLanguage].taskPriorities.low:
            return 'secondary';
        default:
            return 'secondary';
    }
}

function addTaskNotification(task) {
    Swal.fire({
        title: languages[currentLanguage].addTaskNotificationTitle,
        text: languages[currentLanguage].addTaskNotificationText.replace('{taskName}', task.name),
        icon: 'success',
        confirmButtonText: 'حسناً'
    });
}

function updateLanguage() {
    document.getElementById('title').textContent = languages[currentLanguage].title;
    document.getElementById('taskName').placeholder = languages[currentLanguage].taskNamePlaceholder;
    document.getElementById('taskDescription').placeholder = languages[currentLanguage].taskDescriptionPlaceholder;
    document.getElementById('taskPriority').options[0].textContent = languages[currentLanguage].taskPriorityPlaceholder;
    document.getElementById('taskPriority').options[1].textContent = languages[currentLanguage].taskPriorities.high;
    document.getElementById('taskPriority').options[2].textContent = languages[currentLanguage].taskPriorities.medium;
    document.getElementById('taskPriority').options[3].textContent = languages[currentLanguage].taskPriorities.low;
    document.querySelector('button[type="submit"]').textContent = languages[currentLanguage].addButton;
    renderTasks();
}

updateLanguage();