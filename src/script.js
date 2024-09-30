    const addNewTaskButton = document.getElementById('add-new-task-button');
    const addNewTaskBlock = document.getElementById('add-new-task-block');
    const form = document.getElementById('add-task-form');
    const stopAddingNewTaskButton = document.getElementById('stop-adding-new-task');

    addNewTaskButton.addEventListener('click', startAddingTask);
    stopAddingNewTaskButton.addEventListener('click', stopAddingTask);


    // Uses CSS classes to reveal the "Add Task" block
    function startAddingTask() {
        addNewTaskBlock.classList.remove('hidden');
        addNewTaskBlock.classList.add('block');
    }

    // Uses CSS classes to hide the "Add Task" block
    function stopAddingTask() {
        addNewTaskBlock.classList.remove('block');
        addNewTaskBlock.classList.add('hidden');
    }


    // When the form is submitted 
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const taskTitle = document.getElementById('new-task').value;
        const taskDesc = document.getElementById('task-description').value;


        let newTask = `
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${taskTitle}
              </th>
              <td class="px-6 py-4">
                  ${taskDesc}
              </td>
              <td class="px-6 py-4">
                  In Progress
              </td>
              <td class="px-6 py-4">
                  45000 minutes
              </td>
              <td class="px-6 py-4">
                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span class="relative p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Start Timer
                  </span>
                  </button>
            </td>
          </tr>
        `

        // Add new task to task list
        addTaskToList(newTask);
        form.reset();
    })

    // Add new task to task list
    function addTaskToList(task) {  
        const taskList = document.getElementById('task-list');        
        taskList.insertAdjacentHTML('beforeend', task)
    }