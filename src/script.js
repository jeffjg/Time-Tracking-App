// Initialize the timers Map to keep track of timers associated with each task row
const timers = new Map();

// Grab DOM elements
const newTaskButton = document.getElementById("newTaskButton");
const newTaskBlock = document.getElementById("newTaskBlock");
const newTaskInput = document.getElementById("new-task");
const newTaskForm = document.getElementById("newTaskForm");
const haltNewTask = document.getElementById("haltNewTask");
const taskList = document.getElementById("taskList");

newTaskButton.addEventListener("click", toggleNewTaskBlock);
haltNewTask.addEventListener("click", toggleNewTaskBlock);

// Show/Hide New Task Block
function toggleNewTaskBlock() {
  newTaskBlock.classList.toggle("hidden");
  newTaskInput.focus();
}

// "New Task" Form Submission
newTaskForm.addEventListener("submit", function (event) {
  // Prevent Form Default Submission Behavior
  event.preventDefault();

  // Get Task Title and Description from Form
  const taskTitle = document.getElementById("new-task").value.trim();
  const taskDesc = document.getElementById("task-description").value.trim();

  // Add Task to List if title is not empty
  if (taskTitle !== "") {
    addTaskToList(taskTitle, taskDesc);
    // Reset Form
    newTaskForm.reset();
    // Hide the New Task Block
    toggleNewTaskBlock();
  } else {
    alert("Task title cannot be empty.");
  }
});

// Add Task to List
function addTaskToList(taskTitle, taskDesc) {
  // Create Row Elements
  const tr = document.createElement("tr");
  tr.className =
    "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";

  const thTitle = document.createElement("th");
  thTitle.scope = "row";
  thTitle.className =
    "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
  thTitle.textContent = taskTitle;

  const nonHeaderClasses = "px-6 py-4";

  const tdDesc = document.createElement("td");
  tdDesc.className = nonHeaderClasses;
  tdDesc.textContent = taskDesc;

  const tdTime = document.createElement("td");
  tdTime.className = nonHeaderClasses + " runtime";
  tdTime.textContent = "00:00:00";

  const tdButton = document.createElement("td");
  tdButton.className = nonHeaderClasses;

  tdButton.innerHTML = `
        <button class="timer-button relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:text-white dark:text-white">
            <span class="buttonText relative p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Start Timer</span>
        </button>
    `;

  // Append all cells to the row
  tr.appendChild(thTitle);
  tr.appendChild(tdDesc);
  tr.appendChild(tdTime);
  tr.appendChild(tdButton);

  // Append the row to the task list table
  taskList.appendChild(tr);

  // Initialize Timer instance for this task
  const timer = new Timer(tdTime);
  timers.set(tr, timer);

  // Select the timer button within this row
  const timerButton = tdButton.querySelector(".timer-button");

  const nonrunningButtonStyles = [
    "from-purple-600",
    "to-blue-500",
    "group-hover:from-purple-600",
    "group-hover:to-blue-500",
    "hover:text-white",
    "dark:text-white",
  ];
  const runningButtonStyles = [
    "from-teal-300",
    "to-lime-300",
    "text-white",
    "hover:text-gray-900",
    "ring-lime-200",
  ];

  // Event listener for the timer button
  timerButton.addEventListener("click", () => {
    if (!timer.isRunning) {
      timer.start();

      // Update button text
      const buttonText = timerButton.querySelector(".buttonText");
      if (buttonText) {
        buttonText.textContent = "Pause Timer";
        timerButton.classList.remove(...nonrunningButtonStyles);
        timerButton.classList.add(...runningButtonStyles);
      }
    } else {
      timer.pause();
      // Update button text
      const buttonText = timerButton.querySelector(".buttonText");
      if (buttonText) {
        buttonText.textContent = "Start Timer";
        timerButton.classList.remove(...runningButtonStyles);
        timerButton.classList.add(...nonrunningButtonStyles);
      }
    }
  });
}

// Timer Class Definition
class Timer {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;
    this.isRunning = false;
  }

  // Start the Timer Functionality
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.displayElement.style.fontWeight = "bold";
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
      }, 1000);
    }
  }

  // Pause the Timer Functionality
  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.displayElement.style.fontWeight = "normal";
      clearInterval(this.timerInterval);
    }
  }

  // Update Display Method
  updateDisplay() {
    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    this.displayElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}
