

const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const pomodoroTime = 60 * 25; // Twenty five minutes
const breakTime = 60 * 5; // Five minutes

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTasks();
renderTime();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {


  const newTask = {
    id: (Math.random() * 100).toString(36).slice(2),
    title: value,
    completed: false,
  };

  console.log(newTask);

  tasks.unshift(newTask);

  initializeGraphic();
  drawGraphic();
}

// function renderTasks() {
//   const html = tasks.map((task) => {
//     return `
//         <div class="task">
//         <div class="completed">${
//           task.completed
//             ? "<span class='done'>Done</span>"
//             : `<button class="start-button" data-id="${task.id}">Start</button></div>`
//         }
//             <div class="title">${task.title}</div>
//         </div>`;
//   });

function renderTasks() {
    const html = tasks.map((task) => {
      return `
          <div class="task">
          <div class="completed">${
            `<button class="start-button" data-id="${task.id}" button-id="S${task.id}">Start</button>
             <button class="finish-button" data-id="${task.id}" button-id="F${task.id}">Finish</button></div>`
          } <div class="title">${task.title}</div>
          </div>`;
    });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".start-button");

  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      if (!timer) {
        startButtonHandler(startButton.getAttribute("data-id"));
        startButton.textContent = "In progress...";
      }
    });
  });

  const finishButtons = document.querySelectorAll(".task .finish-button");
  finishButtons.forEach((finishButton) => {
    finishButton.addEventListener("click", () => {
      if (!timer) {
        finishButtonHandler(finishButton.getAttribute("data-id"));
        // finishButton.textContent = "In progress...";
      }
    });
  });  
}

function startButtonHandler(id) {
  time = 10; //pomodoroTime;
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);
  document.querySelector("#time #taskName").textContent = tasks[taskId].title;

  renderTime();

  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function finishButtonHandler(id) {
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
  document.querySelector("#time #taskName").textContent = tasks[taskId].title;

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    if (button.getAttribute("button-id") === "S" + id)
    {
      button.disabled = true;
    }
  });

  const finishButtons = document.querySelectorAll(".task .finish-button");

  finishButtons.forEach((button) => {
    if (button.getAttribute("button-id") === "F" + id)
    {
      button.disabled = true;
    }
  });

  initializeGraphic();
  drawGraphic();
}

function timerHandler(id = null) {
  time--;
  renderTime();

  if (time === 0) {
    //markComplete(id);
    clearInterval(timer);
    renderTasks();
    startBreak(id);
  }
}

function markComplete(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}

function markInProgress(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].inProgress = true;
}

function startBreak(id) {
  time = 5; // breakTime;
  document.querySelector("#time #taskName").textContent = "Break";
  //timerBreak = setInterval(timerBreakHandler(), 1000);

  renderTasks();

  timerBreak = setInterval(() => {
    timerBreakHandler(id);
  }, 1000);
}

function timerBreakHandler(id) {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    document.querySelector("#time #taskName").textContent = "";
    renderTime();

    startButtonHandler(id);
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

/* Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
// Las etiquetas son las que van en el eje X. 
const etiquetas = ["Tarea 1", "Tarea 2", "Marzo", "Abril"]
// Podemos tener varios conjuntos de datos. Comencemos con uno
const datosVentas2020 = {
    label: "Ventas por mes-2020",
    data: [5000, 1500, 8000, 5102], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const datosVentas2021 = {
  label: "Ventas por mes-2021",
  data: [10000, 1700, 5800, 5900], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
  backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
  borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
  borderWidth: 1,// Ancho del borde
};

// new Chart($grafica, {
//     type: 'line',// Tipo de gráfica
//     data: {
//         labels: etiquetas,
//         datasets: [
//             datosVentas2020,
//             //datosVentas2021,
//             // Aquí más datos...
//         ]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }],
//         },
//     }
// });
*/




function getTasksInfo()
{
	let completed = 0;
	let pending = 0;
	
	for (x = 0; x < tasks.length; x++){
		if (tasks[x].completed == true)
		{
			completed = completed + 1;
		}
		else{
			pending = pending + 1;
		}
	}
	
	return [completed, pending];
}

function getTasksQty()
{
	return tasks.length;
}
