const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("toggleTheme");

// 📌 Cargar tareas guardadas
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

// 📌 Guardar tareas en localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 📌 Agregar nueva tarea
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

// 📌 Botón "Agregar"
document.getElementById("addBtn").onclick = () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    taskInput.value = "";
  }
};

// 📌 Actualizar texto del botón de tema
function updateButtonText() {
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Modo claro";
  } else {
    themeToggle.textContent = "🌙 Modo oscuro";
  }
}

// 📌 Alternar tema
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateButtonText();
};

// 📌 Al cargar la página, aplicar tema guardado
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateButtonText();

// 🚀 Inicializar
loadTasks();