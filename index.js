const sortBtn = document.querySelector(".sortAZ");
const addBtn = document.querySelector(".button");
const containerTasks = document.querySelector(".container-tasks");
const sortsType = document.querySelectorAll(".sortType > *");

const sortAll = document.getElementById("all");
const sortPend = document.getElementById("pending");
const sortComp = document.getElementById("completed");


// allTask object local stroage yoxlayir eger tasklist varsa onu menimseyir yoxdursa bosh array menimseyir

let allTasks = localStorage.getItem("taskList") === null ? [] : JSON.parse(localStorage.getItem("taskList"));




// allTasks icindeki elementleri (tasklari) htmle gonderir
const displayTasks = () => {

    let taskList;

    const sortStatusType = (sortType) => {
        if(sortType === "pending" || sortType === "completed"){
            taskList = allTasks.filter(item => item.status === sortType)
        } else taskList = allTasks;
    }
    console.log(taskList)
    
    const updateTaskStatus = () => {
        sortsType.forEach(item => {
            item.addEventListener("click", () => {
                sortStatusType(item.getAttribute("status"));
                sortsType.forEach(itemclass => {
                    itemclass.classList.contains("selected-sort") && itemclass.classList.remove("selected-sort")
                })
                item.classList.add("selected-sort")
            })
        })
    }

    updateTaskStatus()

    let html = "";

    taskList.forEach(task => {
        html +=
        `
        <div class="container-input">
            <input type="checkbox" name="" id=${task.id}>
            <input type="text" onblur="editTask(${task.id}, this.value)" value="${task.value}" class="todoApp__input">
            <i onclick=deleteTask(${task.id}) class="fa-regular fa-circle-xmark fa-2x xmark"></i>
        </div>
        `
    })

    localStorage.setItem("taskList", JSON.stringify(allTasks))

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

    displayTasks()
}

addBtn.addEventListener("click", addTask);


// allTask obyektinden secilmish taski silir
const deleteTask = (id) => {
    allTasks.forEach((task, index) => {
        if(id === task.id) allTasks.splice(index, 1) 
    })
    displayTasks();
}

// taski edit etmek ucun
const editTask = (id, value) => {
    allTasks.forEach(task => {
        if(task.id === id) task.value = value
    })
    displayTasks()
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
