import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
  } from "./firebase.js";
  
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const butonCancel = document.getElementById("btn-task-cancel");
  
let editStatus = false;
let id = "";
  
window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${task.title}</h3>
      <p>${task.edad}</p>
      <p>${task.color}</p>
      <p>${task.description}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Borrar
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Editar
        </button>
      </div>
    </div>`;
    });
  
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
    );
  
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-title"].value = task.title;
            taskForm["task-edad"].value = task.edad;
            taskForm["task-color"].value = task.color;
            taskForm["task-description"].value = task.description;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
});
  
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const title = taskForm["task-title"];
    const edad = taskForm["task-edad"];
    const color = taskForm["task-color"];
    const description = taskForm["task-description"];
  
    if (!title.value || !description.value || !edad.value || !color.value) {
      return alert("PorFavor Complete toda la encuesta");
    }
  
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value, edad.value, color.value);
      } else {
        await updateTask(id, {
          title: title.value,
          edad: edad.value,
          color: color.value,
          description: description.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Guardar";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
});
  
butonCancel.addEventListener("click", (e) => {
    taskForm.reset();
  
    editStatus = false;
    id = "";
});