"use strict";
import {getDomElement} from "./modules/Helpers.js";


window.addEventListener('load', () => {
    let taskTitle = getDomElement('.task-input');
    let newTaskBtn = getDomElement('.submit-task');
    let taskList = getDomElement('.task-list');

    let tasks;

    let rend = () => {
        taskList.innerHTML = "";

        let filteredTasks = [
            ...tasks.filter(item => !item.completed), 
            ...tasks.filter(item => item.completed)
        ];

        filteredTasks.forEach((element) => {
            let li = document.createElement('li');
            li.classList.add('task-list-item');
            let label = document.createElement('label');
            label.classList.add('task-list-item-label');
            li.append(label);
            let inp = document.createElement('input');
            inp.dataset.index = element.id;
            inp.setAttribute('type', 'checkbox');
            label.append(inp);
            let span = document.createElement('span');
            label.append(span);
            span.innerHTML = element.title;
            let spanTitle = document.createElement('span');
            span.style.color = "white";
            spanTitle.classList.add('delete-btn');
            li.append(spanTitle);
            if (element.completed) {
                inp.style.backgroundSize = '10px';
                inp.style.border = '1px solid var(--checkbox-color)';
                inp.style.backgroundColor = 'var(--checkbox-color)';
                li.style.backgroundColor = 'lightgreen';
                span.style.color = 'black';
                span.style.textDecoration = 'line-through black';
            }
            taskList.append(li);
        });
    };

    taskList.addEventListener('click', event => {
        if (event.target.nodeName == "INPUT") {
            let findElem = tasks.findIndex(item => item.id == event.target.dataset.index);
            tasks[findElem].completed = !tasks[findElem].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            rend();
        }
    });

    taskList.addEventListener('click', event => {
        if (event.target.nodeName == "SPAN") {
            let listItem = event.target.parentNode;
            tasks.splice(listItem, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            rend();
        }
        
    });

    let OnNewTask = (event) => {
        if(event.type == "click" || event.code == "Enter") {
            if (taskTitle.value) {
                taskTitle.setAttribute('placeholder', 'Add New Task');
                let obj = {
                    id: new Date().getTime().toString(),
                    title: taskTitle.value,
                    completed: false
                };
                tasks.push(obj);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                rend();
                taskTitle.value = "";
            } else {
                taskTitle.setAttribute('placeholder', 'Mi ban gri');
            }
        }
    };

    document.addEventListener('keydown', OnNewTask);

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        rend();
    } else {
        tasks = [];
    }

    newTaskBtn.addEventListener('click', OnNewTask);
});