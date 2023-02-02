const sortBtn = document.querySelector(".sort-icon");
const addBtn = document.querySelector(".button");
const inputContainer = document.querySelector(".container-input");
const containerTasks = document.querySelector(".container-tasks")

addBtn.addEventListener("click", () => {
    inputContainer.classList.remove("hide")
    console.log(inputContainer)
})