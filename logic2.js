let localArray = [];
let total = 0;
let validar = true;
let changeText;
totalObj = 0;
let contadorId = 0;
let idValue;
let validationButtons = true
function guardadoArray(tarea, id) {
  let nombreTarea = {
    Nombre: tarea,
    Id: id,
    estado: "active",
    Validacion: "disabled",
    placeholder: ""
  };
  localArray.push(nombreTarea);
}
///funciones
function eliminar(id) {
  let datos = localStorage.getItem("formulario");
  let datosJson = JSON.parse(datos);
  localArray = datosJson.filter((e) => e.Id !== id);
  localStorage.setItem("formulario", JSON.stringify(localArray));
}

function localSave() {
  localStorage.setItem("formulario", JSON.stringify(localArray));
}

function dataHtml() {
  const section = document.getElementById("section3");
  localArray = JSON.parse(localStorage.getItem("formulario"));
  section.innerHTML = "";

  if (localArray === null) {
    localArray = [];
  } else {
    localArray.forEach((element) => {
      let total= localArray.length
      let taskRemaining = document.getElementById("task-remaining");
      taskRemaining.textContent = `${total} task`
    
      // div principal
      const divContainer = document.createElement("div");

      //div contendor check y tarea 
      const div_space = document.createElement("div");
      div_space.className = "div-container";

      // input tarea
      let inputTask = document.createElement("input");
      inputTask.type = "checkbox";
      inputTask.className = "input-checkBox";
      inputTask.addEventListener("change", (e)=>{
        checkTask(inputTask,element.Id)
        total--
      
      }, false);
      // Task
      let taskH3 = document.createElement("h3");
      taskH3.className = "h3Tarea";
      taskH3.textContent = element.Nombre;

      // Div contenedor botones
      const div_button = document.createElement("div");
      div_button.className = "div-buttons";
      // Botones editar y eliminar
      let button1 = document.createElement("button");
    
      button1.className = "actions-button1";
      button1.textContent= "Edit"
      
      button1.addEventListener("click",(e)=>{
        edit(e,element.id);

      });

      let button2 = document.createElement("button");
      button2.id = "deletee";
      button2.textContent = "Delete";
      button2.className = "actions-button2";
      button2.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.remove();
        eliminar(element.Id);
        window.location = window.location

      });


      if(element.estado==="completado"){
        inputTask.setAttribute("checked", "completed")
        total--;
        let inputCheck =document.createElement("input");
        div_space.insertAdjacentElement("afterbegin", inputCheck);
  
        let checkInput=document.createElement("input");
        checkInput.type="checkbox"
        console.log(checkInput)
        div_space.insertAdjacentElement("afterbegin", checkInput);
  
        checkInput.addEventListener("click", (e)=>{
          checkBlockEdit(e,element.Id)
        })
  
        if(element.Validacion=="Active"){
          button1.setAttribute("disabled","disabled");
          inputCheck.setAttribute("placeholder",element.placeholder)
        }
      }

      let taskActive = document.getElementById("active");
      taskActive.addEventListener("click",taskActivesbtn );
      
      let taskCompleted= document.getElementById("completed")
      taskCompleted.addEventListener("click",taskCompletedbtn );
      taskCompleted
      let allTask = document.getElementById("all")
      allTask.addEventListener("click", allTaskFtn)
      //Html
      section.insertAdjacentElement("beforeend", divContainer);
      divContainer.insertAdjacentElement("beforeend", div_space);
      div_space.insertAdjacentElement("afterbegin", taskH3);
      div_space.insertAdjacentElement("afterbegin", inputTask);
      divContainer.insertAdjacentElement("beforeend", div_button);
      div_button.insertAdjacentElement("afterbegin", button2);
      div_button.insertAdjacentElement("afterbegin", button1);
    })
  }
}

function checkBlockEdit(e,id){
  input = e.target.parentNode.childNodes[3]
  localArray.forEach(element =>{
    if(element.Id === id){
      element.Validacion ="Active"
      element.placeholder = input.value
      window.location=window.location
      localSave()
    }
  })
}
function edit(e,id) {
  validar=false;
  changeText= e.target.parentNode.parentNode.childNodes[0].childNodes[0];
  let editTask= changeText.textContent;
  let getTask= document.getElementById("task")
  getTask.value=editTask;
  idValue=Id;
}

function editArray(){
  validar=true;
  let getTask= document.getElementById("task").value;
  if(getTask==""){
    alert("No se aceptan valores en blanco")
  }else{
    localArray.forEach(element =>{
      if(element.Id==idValue){
        element.Nombre=getTask;
      localStorage.setItem("formulario", JSON.stringify(localArray));
      dataHtml();
      }
    })
  }
  formulario.reset();
}
function checkTask(e,id){
  let check = e.checked;
  if(check){
    localArray.forEach(element =>{
      if(element.Id==id){
        element.estado="completado"
        localStorage.setItem("formulario", JSON.stringify(localArray))
      }
    })
    window.location = window.location
    edit().break();
  }
  else if(check==false){
    localArray.forEach(element =>{
      if(element.Id==id){
        element.estado="active"
        localStorage.setItem("formulario", JSON.stringify(localArray))
      }
    })
    window.location=window.location
  }
}
function taskActivesbtn(){
let arrayActive=localArray.filter(element => element.estado=="active");
localStorage.setItem("taskIncomplete", JSON.stringify(arrayActive));
console.log(arrayActive)
dataActives();
}
function taskCompletedbtn(){
  let arrayCompleted=localArray.filter(element => element.estado=="completado");
localStorage.setItem("taskCompleted", JSON.stringify(arrayCompleted));
console.log(arrayCompleted);
dataCompleted();
}
function dataActives(){
  const section = document.getElementById("section3");
  arrayActive = JSON.parse(localStorage.getItem("taskIncomplete"));
  section.innerHTML = "";

  if (arrayActive === null) {
    arrayActive = [];
  } else {
    arrayActive.forEach((element) => {
      //task remaining
      let total= arrayActive.length
      let taskRemaining = document.getElementById("task-remaining");
      taskRemaining.textContent = `${total} task actives`
      // div comtendor
      const divContainer = document.createElement("div");

      //div contendor check y tarea
      const div_space = document.createElement("div");
      div_space.className = "div-container";

      // input
      let inputTask = document.createElement("input");
      inputTask.type = "checkbox";
      inputTask.className = "input-checkBox";
      inputTask.addEventListener("change", (e)=>{
        checkTask(inputTask,element.Id)
      }, false);
      // tarea
      let taskH3 = document.createElement("h3");
      taskH3.className = "h3Tarea";
      taskH3.textContent = element.Nombre;

      // div botones
      const div_button = document.createElement("div");
      div_button.className = "div-buttons";
      // edit y delete
      let button1 = document.createElement("button");
    
      button1.className = "actions-button1";
      button1.textContent= "Edit"

      button1.addEventListener("click",(e)=>{
        edit(e,element.Id);
      });

      let button2 = document.createElement("button");
      button2.id = "deletee";
      button2.textContent = "Delete";
      button2.className = "actions-button2";
      button2.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.remove();
        eliminar(element.Id);
          total--
      });

      let taskActive = document.getElementById("active");
      taskActive.addEventListener("click",taskActivesbtn );

      let taskCompleted= document.getElementById("completed")
      taskCompleted.addEventListener("click",taskCompletedbtn );
      //inserciones
      section.insertAdjacentElement("beforeend", divContainer);
      divContainer.insertAdjacentElement("beforeend", div_space);
      div_space.insertAdjacentElement("afterbegin", inputTask);
      div_space.insertAdjacentElement("afterbegin", taskH3);
      divContainer.insertAdjacentElement("beforeend", div_button);
      div_button.insertAdjacentElement("afterbegin", button2);
      div_button.insertAdjacentElement("afterbegin", button1);
    });
  }
}
function dataCompleted(){
  const section = document.getElementById("section3");
  let arrayCompleted = JSON.parse(localStorage.getItem("taskCompleted"));
  section.innerHTML = "";

  if (arrayCompleted === null) {
    arrayCompleted = [];
  } else {
    arrayCompleted.forEach((element) => {
      //task remaining
      let total= arrayCompleted.length
      let taskRemaining = document.getElementById("task-remaining");
      taskRemaining.textContent = `${total} task completed`
      // div comtendor
      const divContainer = document.createElement("div");

      //div contendor check y tarea
      const div_space = document.createElement("div");
      div_space.className = "div-container";

      // input
      let inputTask = document.createElement("input");
      inputTask.type = "checkbox";
      inputTask.className = "input-checkBox";
      inputTask.setAttribute("checked", "completed")
      inputTask.addEventListener("change", (e)=>{
        checkTask(inputTask,element.Id)
      }, false);
      // tarea
      let taskH3 = document.createElement("h3");
      taskH3.className = "h3Tarea";
      taskH3.textContent = element.Nombre;

      // div botones
      const div_button = document.createElement("div");
      div_button.className = "div-buttons";
      // edit y delete
      let button1 = document.createElement("button");
    
      button1.className = "actions-button1";
      button1.textContent= "Edit"
      
      button1.addEventListener("click",(e)=>{
        edit(e,element.id);

      });

      let button2 = document.createElement("button");
      button2.id = "deletee";
      button2.textContent = "Delete";
      button2.className = "actions-button2";
      button2.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.remove();
        eliminar(element.Id);
        window.location = window.location

      });


      if(element.estado==="completado"){
        inputTask.setAttribute("checked", "completed")
        total--;
        let inputCheck =document.createElement("input");
        div_space.insertAdjacentElement("afterbegin", inputCheck);
  
        let checkInput=document.createElement("input");
        checkInput.type="checkbox"
        console.log(checkInput)
        div_space.insertAdjacentElement("afterbegin", checkInput);
  
        checkInput.addEventListener("click", (e)=>{
          checkBlockEdit(e,element.Id)
        })
  
        if(element.Validacion=="Active"){
          button1.setAttribute("disabled","disabled");
          inputCheck.setAttribute("placeholder",element.placeholder)
        }
      }

      let taskActive = document.getElementById("active");
      taskActive.addEventListener("click",taskActivesbtn );
      
      let taskCompleted= document.getElementById("completed")
      taskCompleted.addEventListener("click",taskCompletedbtn );
      taskCompleted
      let allTask = document.getElementById("all")
      allTask.addEventListener("click", allTaskFtn)
      //inserciones
      section.insertAdjacentElement("beforeend", divContainer);
      divContainer.insertAdjacentElement("beforeend", div_space);
      div_space.insertAdjacentElement("afterbegin", inputTask);
      div_space.insertAdjacentElement("afterbegin", taskH3);
      divContainer.insertAdjacentElement("beforeend", div_button);
      div_button.insertAdjacentElement("afterbegin", button2);
      div_button.insertAdjacentElement("afterbegin", button1);
    });
  }

}
function  allTaskFtn(){
dataHtml();
}
//// Formulario

function dataForm() {
  let inputNombreTarea = document.getElementById("task").value;
  contadorId += 1;
  guardadoArray(inputNombreTarea, localId());
  localSave();
  dataHtml();
  
  formulario.reset();
}
let formulario = document.getElementById("form");

formulario.addEventListener("submit", getting);
function getting(e) {
  e.preventDefault();
  if (validar == true) {
    dataForm();
  } else {
    editArray();
  }
}
function localId() {
  let dataId = localStorage.getItem("Id") || "0";
  let dataLocal = JSON.parse(dataId) + 1;
  localStorage.setItem("Id", JSON.stringify(dataLocal));
  return dataLocal;
}

document.addEventListener("DOMContentLoaded", dataHtml)
