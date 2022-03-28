export const TODO_UI = {
	HIGH: document.querySelector('.todo__priority--high'),
	LOW: document.querySelector('.todo__priority--low'),
	TASKS: document.querySelectorAll('.task'),
	FORMS_ADD: document.querySelectorAll('form'),
}

export function createTaskNode(name) {
	let div = document.createElement('div');
	div.classList.add("task");
	let input = document.createElement('input');
	input.classList.add('box');
	input.setAttribute('type', 'checkbox');
	let p = document.createElement('p');
	p.textContent = name;
	let button = document.createElement('button');
	button.classList.add('todo__btn--del');
	div.append(input);
	div.append(p);
	div.append(button);
	return div;
}