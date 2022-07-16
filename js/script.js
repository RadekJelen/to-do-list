{
    const tasks = [
        {
            content: "test",
            done: false,
        },
        {
            content: "test",
            done: true,
        },
    ];

    const autofokusInput = (newTaskElement) => {
        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
        };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const addEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove"); 

        removeButtons.forEach((removeButton, index) => { 
            removeButton.addEventListener("click", () => { 
                deleteTask(index); 
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done"); 

            toggleDoneButtons.forEach((toggleDoneButton, index) => { 
                toggleDoneButton.addEventListener("click", () => { 
                    toggleTaskDone(index); 
            });
        });
    };


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += ` 
            <li
            class="list__item${task.done ? "" : ""}"
            >
                <button class="list__button js-done">
                ${task.done ? "&#10004;" : ""}
                </button>
                <span class="list__span ${task.done ? "list__span--done" : ""}">
                ${task.content}
                </span>
                <button class="list__button list__button--remove js-remove">&#128465
                </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        addEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

            if (newTaskContent === "") { 
                return;
            }; 

            addNewTask(newTaskContent);
            autofokusInput(newTaskElement);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}