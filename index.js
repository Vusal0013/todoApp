const sortBtn = document.querySelector(".sortAZ");
const addBtn = document.querySelector(".button");
const containerTasks = document.querySelector(".container-tasks");
const sortsType = document.querySelectorAll(".sortType > *");

const sortAll = document.getElementById("all");
const sortPend = document.getElementById("pending");
const sortComp = document.getElementById("completed");


// allTask object local stroage yoxlayir eger tasklist varsa onu menimseyir yoxdursa bosh array menimseyir

let allTasks = localStorage.getItem("taskList") === null ? [] : JSON.parse(localStorage.getItem("taskList"));

let taskList; 

const sortStatusType = (sortType) => {
    if(sortType === "pending" || sortType === "completed"){
        allTasks = allTasks.filter(item => item.status === sortType)
    }
}

sortsType.forEach(item => {
    item.addEventListener("click", () => {
        sortsType.forEach(itemclass => {
            itemclass.classList.contains("selected-sort") && itemclass.classList.remove("selected-sort")
        })
        item.classList.add("selected-sort")
        sortStatusType(item.getAttribute("status"));
        displayTasks()
        allTasks = JSON.parse(localStorage.getItem("taskList"))
    })
}) 
const updateTaskStatus = (id, element) => {
    allTasks.forEach(task => {
        if(task.id === id) {
                if(element.checked){
                    task.status = "completed"
                    element.nextElementSibling.classList.add("line-through")
                }
                else {
                    task.status = "pending"
                    element.nextElementSibling.classList.remove("line-through")
                }
        }
    })
    
    displayTasks()
    localStorage.setItem("taskList", JSON.stringify(allTasks))
}

// allTasks icindeki elementleri (tasklari) htmle gonderir

const displayTasks = () => {


    let html = "";

    allTasks.forEach(task => {
        html +=
        `
        <div class="container-input">
            <input ${task.status === "completed" ? "checked" : ""} onclick="updateTaskStatus(${task.id}, this)" type="checkbox" name="">
            <input id=${task.id} type="text" onblur="editTask(${task.id}, this.value)" value="${task.value}" class="todoApp__input">
            <i onclick=deleteTask(${task.id}) class="fa-regular fa-circle-xmark fa-2x xmark"></i>
        </div>
        `
    })

    containerTasks.innerHTML = html
}


// sehife yuklendiyi zaman display task funksiyasini ishkledir
window.addEventListener("load", displayTasks);


// yeni task elave edir allTask arrayina
const addTask = () => {
    let taskId = 0;
    for (let item of allTasks) {
        for (let task of allTasks) {
            taskId == task.id && taskId++;
        }
    }

    let task = 
    {
        value: "",
        status: "pending",
        id: taskId
    }

    allTasks.push(task);
    localStorage.setItem("taskList", JSON.stringify(allTasks))
    displayTasks()
}

addBtn.addEventListener("click", addTask);


// allTask obyektinden secilmish taski silir
const deleteTask = (id) => {
    allTasks.forEach((task, index) => {
        if(id === task.id) allTasks.splice(index, 1) 
    })

    localStorage.setItem("taskList", JSON.stringify(allTasks))
    displayTasks();
}

// taski edit etmek ucun
const editTask = (id, value) => {
    allTasks.forEach(task => {
        if(task.id === id) task.value = value
    })

    localStorage.setItem("taskList", JSON.stringify(allTasks))
}

let sortAZ = false;

// taski Elifba sirasi ile siralayir
const sortAlphabet = () => {
    if(!sortAZ){
        sortBtn.firstChild.classList = "fa-solid fa-arrow-down-short-wide fa-2x"
        allTasks.sort((a,b) => {
            if(a.value.toUpperCase() < b.value.toUpperCase()){
                return -1
            }
            else if(b.value.toUpperCase() < a.value.toUpperCase()){
                return 1
            }
            else return 0
        })
        sortAZ = true;
    } else {
        sortBtn.firstChild.classList = "fa-solid fa-arrow-down-wide-short fa-2x"
        allTasks.sort((a,b) => {
            if(a.value.toUpperCase() < b.value.toUpperCase()){
                return 1
            }
            else if(b.value.toUpperCase() < a.value.toUpperCase()){
                return -1
            }
            else return 0
        })
        sortAZ = false;
    }
    displayTasks()
}
sortBtn.addEventListener("click", sortAlphabet)
