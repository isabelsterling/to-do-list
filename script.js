const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.querySelector("span").textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };
  li.appendChild(delBtn);

  li.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  if (completed) li.classList.add("completed");

  taskList.appendChild(li);
  saveTasks();
}

document.getElementById("addBtn").onclick = () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
  }
};

loadTasks();