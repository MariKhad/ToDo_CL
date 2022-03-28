import { TODO_UI } from './view.js';
import { createTaskNode } from './view.js';

let BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
let CHECKBOXES = document.querySelectorAll('.box');
let taskList = [];


allTasksAdd();
checkedStyle();
taskDelete();




function taskDelete() {
	for (let button of BUTTONS_DEL) {
		button.addEventListener('click', function (event) {
			const targetTask = event.target;
			let taskName = targetTask.previousSibling.textContent;
			taskList = taskList.filter(item => item.name !== taskName);
			console.log(taskList);
			targetTask.parentElement.remove();
			BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
			CHECKBOXES = document.querySelectorAll('.box');
		})
	}

	return taskList, CHECKBOXES, BUTTONS_DEL;
}

function checkedStyle() {
	for (let box of CHECKBOXES) {
		box.addEventListener('change', function () {
			if (box.checked === true) {
				box.parentElement.classList.add('done')
			} else {
				box.parentElement.classList.remove('done')
			}
		});
	}
	return CHECKBOXES, BUTTONS_DEL;
}


function allTasksAdd() {
	for (let form of TODO_UI.FORMS_ADD) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (form.firstElementChild.value === "") {
				alert('Add task please');
			} else if (form.className === 'high') {
				taskAdd('high');
			} else taskAdd('low');
		});
	}
}

function taskAdd(prior) {
	let selector = `.${prior}`;
	const targetForm = document.querySelector(selector);
	let newTask = {};
	newTask.name = targetForm.firstElementChild.value;
	targetForm.firstElementChild.value = "";
	newTask.priority = prior;
	taskList.push(newTask);
	let div = createTaskNode(newTask.name);
	if (prior === 'high') {
		TODO_UI.HIGH.append(div);
	} else {
		TODO_UI.LOW.append(div);
	}
	CHECKBOXES = document.querySelectorAll('.box');
	BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
	checkedStyle();
	taskDelete();
	return taskList, CHECKBOXES, BUTTONS_DEL;
}