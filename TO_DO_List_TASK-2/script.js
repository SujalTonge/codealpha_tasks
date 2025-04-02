document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text" onclick="toggleComplete(this)">${taskInput.value}</span>
        <div class="actions">
            <button class="priority" onclick="moveUp(this)">🔼</button>
            <button class="priority" onclick="moveDown(this)">🔽</button>
            <button class="delete" onclick="removeTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
}

function removeTask(button) {
    let li = button.closest('li');
    li.remove();
    saveTasks();
}

function toggleComplete(task) {
    task.classList.toggle('completed');
    saveTasks();
}

function moveUp(button) {
    let li = button.closest('li');
    if (li.previousElementSibling) {
        li.parentNode.insertBefore(li, li.previousElementSibling);
        saveTasks();
    }
}

function moveDown(button) {
    let li = button.closest('li');
    if (li.nextElementSibling) {
        li.parentNode.insertBefore(li.nextElementSibling, li);
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('.task-text').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleComplete(this)">${task.text}</span>
            <div class="actions">
                <button class="priority" onclick="moveUp(this)">🔼</button>
                <button class="priority" onclick="moveDown(this)">🔽</button>
                <button class="delete" onclick="removeTask(this)">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}
