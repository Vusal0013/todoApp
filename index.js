const sortBtn = document.querySelector(".sortAZ");
const addBtn = document.querySelector(".button");
const containerTasks = document.querySelector(".container-tasks");
const sortsType = document.querySelectorAll(".sortType > *");

const sortAll = document.getElementById("all");
const sortPend = document.getElementById("pending");
const sortComp = document.getElementById("completed");

const deleteAll = document.querySelector(".deleteAll");


// allTask object local stroage yoxlayir eger tasklist varsa onu menimseyir yoxdursa bosh array menimseyir

let allTasks = localStorage.getItem("taskList") === null ? [] : JSON.parse(localStorage.getItem("taskList"));

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
    localStorage.setItem("taskList", JSON.stringify(allTasks));
}

// allTasks icindeki elementleri (tasklari) htmle gonderir

const displayTasks = () => {

    let html = "";

    const displaySortedTasks = (tasks) => {
        if(tasks === "completed") tasks = allTasks.filter(task => task.status === "completed")
        if(tasks === "pending") tasks = allTasks.filter(task => task.status === "pending")
        if(tasks === "all") tasks = allTasks
        tasks.forEach(task => {
            html +=
            `
            <div class="container-input">
                <input ${task.status === "completed" ? "checked" : ""} onclick="updateTaskStatus(${task.id}, this)" type="checkbox" name="">
                <input id=${task.id} type="text" onblur="editTask(${task.id}, this.value)" value="${task.value}" class="todoApp__input ${task.status === "completed" ? "line-through" : ""}">
                <i onclick=deleteTask(${task.id}) class="fa-regular fa-circle-xmark fa-2x xmark"></i>
            </div>
            `
        })
    
        containerTasks.innerHTML = html
    }
    
    sortsType.forEach(item => {
        if(item.classList.contains("selected-sort")){
            displaySortedTasks(item.id)
        }
    })
}


// sehife yuklendiyi zaman display task funksiyasini ishkledir
window.addEventListener("load", () => {
    sortAll.classList.add("selected-sort")
    displayTasks();
})


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

//deleteAll

deleteAll.addEventListener("click", () => {
    localStorage.removeItem("taskList");
    allTasks = []
    displayTasks()
})


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
        sortBtn.firstChild.classList = "fa-solid fa-arrow-down-short-wide fa-2x";

        allTasks.sort((a, b) => {
            return a.value.localeCompare(b.value, undefined, {
              numeric: true,
              sensitivity: 'base'
            });
          });
        sortAZ = true;
    } else {
        sortBtn.firstChild.classList = "fa-solid fa-arrow-down-wide-short fa-2x"
        allTasks.sort((a,b) => {
            return b.value.localeCompare(a.value, undefined, {
                numeric: true,
                sensitivity: 'base'
              });
        })
        sortAZ = false;
    }
    displayTasks()
}
sortBtn.addEventListener("click", sortAlphabet)
