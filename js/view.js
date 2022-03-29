export const TODO_UI = {
	HIGH: document.querySelector('.todo__priority--high'),
	LOW: document.querySelector('.todo__priority--low'),
	TASKS: document.querySelectorAll('.task'),
	FORMS_ADD: document.querySelectorAll('form'),
}

export function createTaskNode(name, isChecked) {
	let div = document.createElement('div');
	div.classList.add("task");
	let input = document.createElement('input');
	input.checked = isChecked;
	input.classList.add('box');
	input.setAttribute('type', 'checkbox');
	let p = document.createElement('p');
	p.textContent = name;
	let button = document.createElement('button');
	button.classList.add('todo__btn--del');
	div.append(input);
	if (input.checked === true) {
		input.parentElement.classList.add('done');
	}
	div.append(p);
	div.append(button);
	return div;
}