{
	let tasks = [];

	const autofocusInput = (inputElement) => {
		inputElement.value = "";
		inputElement.focus();
	};

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{content: newTaskContent,
			done: false,
			},
		];
		render();
	};

	const deleteTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

	const toggleTaskDone = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			{ ...tasks[taskIndex], done: !tasks[taskIndex].done, },
			...tasks.slice(taskIndex + 1),
		];
		render();
	};


	const addEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");
		const doneButtons = document.querySelectorAll(".js-done");  

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				deleteTask(index); 
			});
		});

		doneButtons.forEach((doneButton, index) => {
			doneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	};

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
				<li class="list__item">
					<button class="list__button js-done">
						${task.done ? "&#10004;" : ""}
					</button>
					<span class="list__span ${task.done ? "list__span--done" : ""}">
						${task.content}
					</span>
					<button class="list__button list__button--remove js-remove">
						&#128465
					</button>
				</li>
			`;
		};

		document.querySelector(".js-tasks").innerHTML = htmlString;

		addEvents();
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const inputElement = document.querySelector(".js-input");
		const newTaskContent = inputElement.value.trim();

		if (newTaskContent === "") { 
			return;
		}; 

		addNewTask(newTaskContent);
		autofocusInput(inputElement);
	};

	const init = () => {
		const formElement = document.querySelector(".js-form");

		render();

		formElement.addEventListener("submit", onFormSubmit);
	};

	init();
}