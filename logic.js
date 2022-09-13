let inputAdd = document.getElementById("check");
let list = document.getElementById("lista");
let validar = true;
let total = 0;
let validacion;
let validationButtons = true;
let contadorTask = 0;

function data(tarea) {
  //Html
  let seccion = document.getElementById("section3");
  let space = document.createElement("div");
  space.className = "div-container";
  let div_button = document.createElement("div");
  let check = document.createElement("input");
  let div_space = document.createElement("div");
  div_button.className = "div-buttons";
  check.type = "checkbox";
  check.className = "check";
  div_space.className= "div_space_container incompleta"

  let title = document.createElement("p");

  title.textContent = tarea;

  let button = document.createElement("button");

  let button2 = document.createElement("button");

  button.textContent = "Edit";

  button2.textContent = "Delete";

  button.className = "actions-button1";
  button2.className = "actions-button2";

  div_space.insertAdjacentElement("afterbegin", div_button);

  div_space.insertAdjacentElement("afterbegin", space);

  div_button.insertAdjacentElement("afterbegin", button);

  div_button.insertAdjacentElement("afterbegin", button2);

  seccion.insertAdjacentElement("beforebegin", div_space);

  space.insertAdjacentElement("afterbegin", check);

  space.insertAdjacentElement("afterbegin", title);

  total++;

  check.addEventListener("change", validaCheckbox, false);

  let cantidad = document.getElementById("task-remaining");


  //Task remaining
  
  cantidad.innerHTML = total + " Task remaining";
  function validaCheckbox(e) {
    let div_check = e.target.parentNode.parentNode;
    let checked = e.target;
    checked = check.checked;
    cantidad.innerText = total + " Task remaining";
    if (checked) {
      if(validationButtons === true){
        div_check.className="div_space_container completada"
      }
      else{
        div_check.className="div_space_container incompleta"
      }

      validacion==true;
      total--;
      alert("tarea completada");
      if (total == 0) {
        cantidad.innerHTML = " Task remaining";
      } else {
        cantidad.innerHTML = total + " Task remaining";
      }
    }
    if (checked == false) {
      if(validationButtons === false){
        div_check.className="div_space_container completa"
      }
      else{
        div_check.className="div_space_container incompleta"
      }
      validacion=false;
      total++;
      cantidad.innerHTML = total + " Task remaining";
    }
  
   
  }

//Boton delete
  button2.addEventListener("click", function eliminar(eliminar){
    let elemntDelete = eliminar.target.parentNode.parentNode;
    elemntDelete.remove();
  
   let validar = elemntDelete.className;
   if(validar.includes("incompleta")){
    total--;
    cantidad.innerHTML= total + " Task remaining"
   }
   if(validar.includes("completada")){
    total;
    cantidad.innerHTML= total + " Task remaining"
  }
  if(total==0){
    cantidad.innerHTML=  " Task remaining"
  }
  
  });

button.addEventListener("click", editInput)
let completed = document.getElementById("completed");
completed.addEventListener("click",completedTask)
let active= document.getElementById("active")
active.addEventListener("click", activeTask)
let add= document.getElementById("all")
add.addEventListener("click", allTask)

  form.reset();
}

function completedTask(e){
  validationButtons = true;
  let classIncom = document.getElementsByClassName("div_space_container incompleta")
  let classCompl = document.getElementsByClassName("div_space_container completada")
  let cantidad = document.getElementById("task-remaining");
  for(i=0;classIncom.length>i;i++){
    classIncom[i].style="display: none;"
    
  }
  for(j=1;classCompl.length>=j;j++){
    
    classCompl[j].style="display: block;"
  }
}

function activeTask(e){
  validationButtons = true;
  let classIncom = document.getElementsByClassName("div_space_container completada")
  let classCompl = document.getElementsByClassName("div_space_container incompleta")
  for(i=0;classIncom.length>i;i++){
    classIncom[i].style="display: none;"
  }
  for(i=0;classCompl.length>i;i++){
    classCompl[i].style="display: block;"
  }
}

function allTask(e){
  let classIncom = document.getElementsByClassName("div_space_container completada")
  let classCompl = document.getElementsByClassName("div_space_container incompleta")
  for(i=0;classIncom.length>i;i++){
    classIncom[i].style="display: block;"
  }
  for(i=0;classCompl.length>i;i++){
    classCompl[i].style="display: block;"
  }
}






//edit 
let changeText;
function editInput(e){
validar=false;
changeText= e.target.parentNode.parentNode.childNodes[0].childNodes[0];
console.log(changeText);
let editTask= changeText.textContent;
let getTask= document.getElementById("task")
getTask.value=editTask;
}
function editTarea(e){
validar=true;
let getTask = document.getElementById("task").value
if(getTask===""){

  alert("Agregue valores a la tarea")
}else{
  changeText.textContent=`${getTask}`
}
}

//Form
const form = document.getElementById("form");
form.addEventListener("submit", getting);
function envio() {
  validar=true
  let task = document.getElementById("task").value;
  data(task);
}

function getting(e){
e.preventDefault();
if(validar==true){
  envio()
}else{
  editTarea()
}


}

