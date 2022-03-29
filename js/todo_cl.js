getTasks();

import { TODO_UI } from './view.js';
import { createTaskNode } from './view.js';

const DONE = "done";
const IN_PROGRESS = "in progress";

let BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
let CHECKBOXES = document.querySelectorAll('.box');

tasksAdd();
checkedStyle();
taskDelete();

function getTasks() {
	let tasks = Object.keys(localStorage);
	let isChecked;
	for (let task of tasks) {
		task = JSON.parse(localStorage.getItem(task));
		console.log(task.status);
		if (task.status === 'done') {
			isChecked = true;
		} else {
			isChecked = false;
		}
		let div = createTaskNode(task.name, isChecked);
		if (task.priority === 'high') {
			TODO_UI.HIGH.append(div);
		} else {
			TODO_UI.LOW.append(div);
		}
	}
}




function taskDelete() {
	for (let button of BUTTONS_DEL) {
		button.addEventListener('click', function () {
			const currentTaskName = button.previousSibling.textContent;
			localStorage.removeItem(currentTaskName);
			button.parentElement.remove();
			BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
			CHECKBOXES = document.querySelectorAll('.box');
		})
	}

	return CHECKBOXES, BUTTONS_DEL;
}

function checkedStyle() {
	for (let box of CHECKBOXES) {
		box.addEventListener('change', function () {
			let task, currentTasksPriority;
			const currentTaskName = box.nextElementSibling.textContent;
			if (box.parentElement.parentElement.className === 'todo__priority--high') {
				currentTasksPriority = 'high';
			} else {
				currentTasksPriority = 'low';
			}
			if (box.checked === true) {
				box.parentElement.classList.add('done');
				task = new Task(currentTaskName, currentTasksPriority);
				task.status = DONE;
				console.log(task);
				localStorage.setItem(currentTaskName, JSON.stringify(task));
			} else {
				box.parentElement.classList.remove('done')
				task = new Task(currentTaskName, currentTasksPriority);
				task.status = IN_PROGRESS;
				localStorage.setItem(currentTaskName, JSON.stringify(task));
			}
			console.log(taskList);
		});
	}
	return CHECKBOXES, BUTTONS_DEL;
}

function Task(name, priority) {
	this.name = name;
	this.priority = priority;
	this.status = IN_PROGRESS;
}

function tasksAdd() {
	for (let form of TODO_UI.FORMS_ADD) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			const formValue = form.firstElementChild.value;
			if (formValue === "") {
				alert('Add task please');
			} else if (localStorage.getItem(formValue) !== null) {
				alert('This task is already in the list');
			} else {
				let name = form.firstElementChild.value;
				form.firstElementChild.value = "";
				let priority = form.className;
				let newTask = new Task(name, priority);
				localStorage.setItem(name, JSON.stringify(newTask));
				let div = createTaskNode(newTask.name);
				if (form.className === 'high') {
					TODO_UI.HIGH.append(div);
				} else {
					TODO_UI.LOW.append(div);
				}
				CHECKBOXES = document.querySelectorAll('.box');
				BUTTONS_DEL = document.querySelectorAll('.todo__btn--del');
				checkedStyle();
				taskDelete();
				return CHECKBOXES, BUTTONS_DEL;
			}
		});
	}
}