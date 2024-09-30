    const addNewTaskButton = document.getElementById('add-new-task-button');
    const addNewTaskBlock = document.getElementById('add-new-task-block');
    const form = document.getElementById('add-task-form');
    const stopAddingNewTaskButton = document.getElementById('stop-adding-new-task');



    addNewTaskButton.addEventListener('click', () => {
        if (addNewTaskBlock.classList.contains('hidden')) {
           startAddingTask();
        } else {
            stopAddingTask();
        }
    });

    stopAddingNewTaskButton.addEventListener('click', stopAddingTask);



    // Uses classes to reveal the "Add Task" block
    function startAddingTask() {
        addNewTaskBlock.classList.remove('hidden');
        addNewTaskBlock.classList.add('block');
    }

    // Uses classes to hide the "Add Task" block
    function stopAddingTask() {
        addNewTaskBlock.classList.remove('block');
        addNewTaskBlock.classList.add('hidden');
    }



    // When the form is submitted 
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const taskTitle = document.getElementById('new-task').value.trim();
        const taskDesc = document.getElementById('task-description').value.trim();

        // Add new task to task list
        addTaskToList(taskTitle, taskDesc);

        // Reset the form.
        form.reset();
    })



    // Adds a task to the list with the given title and description to the task list.
    function addTaskToList(taskTitle, taskDesc) {  
       const taskList = document.getElementById('task-list');

       // Create elements
        const tr = document.createElement('tr');
        tr.className = 'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700';

        const thTitle = document.createElement('th');
        thTitle.scope = 'row';
        thTitle.className = 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white';
        thTitle.textContent = taskTitle;

        const nonHeaderClasses = 'px-6 py-4';

        const tdDesc = document.createElement('td');
        tdDesc.className = nonHeaderClasses;
        tdDesc.textContent = taskDesc;

        const tdStatus = document.createElement('td');
        tdStatus.className = nonHeaderClasses;
        tdStatus.textContent = 'Not Started';

        const tdTime = document.createElement('td');
        tdTime.className = nonHeaderClasses;
        tdTime.textContent = '-';

        const tdButton = document.createElement('td');
        tdButton.className = nonHeaderClasses;


        tdButton.innerHTML = `<button id="timer-button" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"><span class="relative p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Start Timer</span></button>`;

         // Append th/td to tr.
        tr.appendChild(thTitle);
        tr.appendChild(tdDesc);
        tr.appendChild(tdStatus);
        tr.appendChild(tdTime);
        tr.appendChild(tdButton);

        // Append tr to task list:
        taskList.appendChild(tr);

    }