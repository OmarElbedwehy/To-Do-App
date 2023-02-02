let send_btn = document.querySelector("#main_btn");
let task_input = document.querySelector("input");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
})

window.onload = () => {
    task_input.focus()
}

let main_arr = [];

if (localStorage.getItem("tasks")) {
    main_arr = JSON.parse(localStorage.getItem("tasks"));
}

send_btn.onclick = function () {
    if (task_input.value !== "") {
        addTask(task_input.value);
        task_input.value = "";
        localStorage.setItem("tasks", JSON.stringify(main_arr));
        window.location.reload();
    }
}

function addTask(task) {
    const tasks = {
        id: Date.now(),
        title: task,
        completed: false,
    }
    main_arr.push(tasks);
}

function addElesToPage(tasks) {
    let tasks_div = document.querySelector("#tasks-div")
    tasks_div.innerHTML = "";
    tasks.forEach((ele) => {
        let li = document.createElement("li");
        li.id = "task";
        li.setAttribute("data-id", ele.id);
        li.setAttribute("completed", ele.completed)
        li.innerHTML = `${ele.title} <div><i id="done" class="fa-solid fa-check"></i><i id="del" class="fas fa-trash"></i></div>`;
        tasks_div.appendChild(li)
    })
}

function getData() {
    let tasks = localStorage.getItem("tasks");
    let data = JSON.parse(tasks);
    addElesToPage(data)
}

getData()

function done() {
    let done_btn = document.querySelectorAll("#done");
    done_btn.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            let ele_id = e.target.parentElement.parentElement.getAttribute("data-id");
            main_arr.forEach((ele) => {
                if (ele_id == ele.id) {
                    if (ele.completed == false) {
                        ele.completed = true;
                    } else {
                        ele.completed = false;
                    }
                }
            })
            localStorage.setItem("tasks", JSON.stringify(main_arr));
            e.target.parentElement.parentElement.classList.toggle("done")
        })
    })
    document.querySelectorAll("#task").forEach((ele) => {
        if (ele.getAttribute("completed") == "true") {
            ele.classList.add("done");
        } else {
            ele.classList.remove("done");
        }
    })
}

done();

function del() {
    let del_btn = document.querySelectorAll("#del");
    del_btn.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.style.animation = "del 1s 1 forwards"
            setTimeout(() => {
                let ele_id = e.target.parentElement.parentElement.getAttribute("data-id")
                main_arr = main_arr.filter((task) => task.id != ele_id);
                localStorage.setItem("tasks", JSON.stringify(main_arr));
                e.target.parentElement.parentElement.remove();
                window.location.reload()
            }, 500)
        })
    })
}

del()

document.querySelector("#clear-all").addEventListener("click", () => {
    let tasks_div = document.querySelector("#tasks-div")
    // tasks_div.innerHTML = "";
    document.querySelectorAll("#task").forEach((ele) => {
        ele.style.animation = "del 1s 1 forwards";
    })
    setTimeout(() => {
        window.localStorage.removeItem("tasks");
        window.location.reload()
    }, 500)
})

document.querySelector(".bottom p").textContent = `You Have ${main_arr.length} Pending Tasks`;