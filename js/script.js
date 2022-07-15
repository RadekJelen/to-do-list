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
            class="list__item${task.done ? " list__item--done" : ""}"
            >
                <button class="list-button js-done">&#10004</button>
                <button class="list-button list-button--remove js-remove">&#128465</button>
                ${task.content} 
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