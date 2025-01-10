document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText, false); 
            taskInput.value = '';
        }
    });

    function addTask(text, isCompleted) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        if (isCompleted) taskItem.classList.add('completed');
        const taskId = `task-${Date.now()}`;
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        taskItem.innerHTML = `
            <input type="checkbox" id="${taskId}" ${isCompleted ? 'checked' : ''}>
            <div class="task-content">
                <label for="${taskId}">${text}</label>
                <span class="task-date">${isCompleted ? `Completed: ${formattedDate}` : `Added: ${formattedDate}`}</span>
            </div>
            <div class="task-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;


        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            const dateSpan = taskItem.querySelector('.task-date');
            if (checkbox.checked) {
                taskItem.classList.add('completed');
                completedTasks.appendChild(taskItem);
                dateSpan.textContent = `Completed: ${new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}`;
            } else {
                taskItem.classList.remove('completed');
                pendingTasks.appendChild(taskItem);
                dateSpan.textContent = `Added: ${formattedDate}`;
            }
        });
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
        });
        if (isCompleted) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    }
    document.querySelectorAll('.task-item').forEach((taskItem) => {
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        const dateSpan = taskItem.querySelector('.task-date');
        const isCompleted = checkbox.checked;

        if (isCompleted) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskItem.classList.add('completed');
                completedTasks.appendChild(taskItem);
                dateSpan.textContent = `Completed: ${new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}`;
            } else {
                taskItem.classList.remove('completed');
                pendingTasks.appendChild(taskItem);
                dateSpan.textContent = `Added: ${dateSpan.dataset.addedDate}`;
            }
        });

        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
        });
        function cancelEdit(taskItem, label, input) {
            const taskContent = taskItem.querySelector('.task-content');
            taskContent.replaceChild(label, input);
        }
    
    });
});
