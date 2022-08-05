
//Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list-ul');
const currentTaskText = document.querySelector('.current-task--text');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTasksLocal);
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', taskMenuAction);


//Functions
function addTask(event) {
    if (taskInput.value === "") {
        event.stopImmediatePropagation();
        event.preventDefault();
        alert("A blank task? sad meow😿");
    } else{
    //Prevent form from submitting
    event.preventDefault();
    //Task div creation
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Paw Icon
    const taskIcon = document.createElement('div');
    taskIcon.innerHTML = '<i class="fas fa-paw"></i>';
    taskIcon.classList.add("task-list--task-badge");
    taskDiv.appendChild(taskIcon);
    //Create LI
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value;
    newTask.classList.add('task-list--task-text');
    taskDiv.appendChild(newTask);
    //Add task to localStorage
    saveTasksLocal(taskInput.value);
    //Edit button
    const taskEdit = document.createElement('div');        
    taskEdit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    taskEdit.classList.add("task-list--task-edit");
    taskDiv.appendChild(taskEdit);
    //Complete button
    const taskCheck = document.createElement('div');
    taskCheck.innerHTML = '<i class="fas fa-check"></i>';
    taskCheck.classList.add("task-list--task-check");
    taskDiv.appendChild(taskCheck);
    //Delete button
    const taskDelete = document.createElement('div');
    taskDelete.innerHTML = '<i class="fas fa-trash"></i>';
    taskDelete.classList.add("task-list--task-delete");
    taskDiv.appendChild(taskDelete);
    //Append to UL list
    taskList.appendChild(taskDiv);
    //Clear Task Input after adding task
    taskInput.value = "";
    //Update current task above list
    const firstListItem = $('ul').each(function() {
        currentTaskText.innerHTML = $(this).find('li').eq(0).text();
        //Update text field if there are no current tasks after the user has entered tasks
        if(currentTaskText.innerHTML === "") {
            currentTaskText.innerHTML = "no current task";
            currentTaskText.classList.add('white50');
        } else {
            currentTaskText.classList.remove('white50');
        };
    })
}
}


function taskMenuAction(e){
    const item = e.target;
    //Delete task
    if(item.classList[0] === 'task-list--task-delete') {
       const task = item.parentElement;
       //Animation
       task.classList.add("delete-animation");
       removeTaskLocal(task);
        task.addEventListener('transitionend', function(){
            task.remove();
            const firstListItem = $('ul').each(function() {
                currentTaskText.innerHTML = $(this).find('li').eq(0).text();
                    //Update text field if there are no current tasks after the user has entered tasks
                if(currentTaskText.innerHTML === "") {
                    currentTaskText.innerHTML = "You've done it!";
                    currentTaskText.classList.add('white50');
                } else {
                    //Remove faded white class and update with new current task
                    currentTaskText.classList.remove('white50');
                    currentTaskText.innerHTML = $(this).find('li').eq(0).text();
                };

           })
        });
    }

    //Complete task
    if(item.classList[0] === 'task-list--task-check') {
        const task = item.parentElement;
        task.classList.toggle("completed");
        //TODO: I want to loop through the task list to get the next uncompleted tasks after the user checks complete on the one above.
        //Then update a "current task" paragraph to display the text within the new current task
        //I need to find something to replace switch with..this is just from a tutorial
        function updateCurrentTask(e) {
            const tasks = taskList.childNodes;
            tasks.forEach(function(task){
            switch(e.target.value) {
                case "completed":
                    if(task.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                break;
            }
            });
        }
     }

     //Edit Task text

}


///////LOCAL STORAGE////////
function saveTasksLocal(task) {
    //Check to see if there are tasks in local storage
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksLocal() {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        //Task div creation
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Paw Icon
    const taskIcon = document.createElement('div');
    taskIcon.innerHTML = '<i class="fas fa-paw"></i>';
    taskIcon.classList.add("task-list--task-badge");
    taskDiv.appendChild(taskIcon);
    //Create LI
    const newTask = document.createElement('li');
    newTask.innerText = task;
    newTask.classList.add('a-new-task');
    taskDiv.appendChild(newTask);
    //Edit button
    const taskEdit = document.createElement('div');        
    taskEdit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    taskEdit.classList.add("task-list--task-edit");
    taskDiv.appendChild(taskEdit);
    //Complete button
    const taskCheck = document.createElement('div');
    taskCheck.innerHTML = '<i class="fas fa-check"></i>';
    taskCheck.classList.add("task-list--task-check");
    taskDiv.appendChild(taskCheck);
    //Delete button
    const taskDelete = document.createElement('div');
    taskDelete.innerHTML = '<i class="fas fa-trash"></i>';
    taskDelete.classList.add("task-list--task-delete");
    taskDiv.appendChild(taskDelete);
    //Append to UL list
    taskList.appendChild(taskDiv);
    const firstListItem = $('ul').each(function() {
        currentTaskText.innerHTML = $(this).find('li').eq(0).text();
            //Update text field if there are no current tasks after the user has entered tasks
        if(currentTaskText.innerHTML === "") {
            currentTaskText.innerHTML = "You've done it!";
            currentTaskText.classList.add('white50');
        } else {
            //Remove faded white class and update with new top task
            currentTaskText.classList.remove('white50');
            currentTaskText.innerHTML = $(this).find('li').eq(0).text();
        };

        })
    })
}

function removeTaskLocal(task) {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //Find the task text that is to be deleted, then find that same text in the array and delete it.
    const taskIndex = task.children[1].innerText;
    console.log(taskIndex);
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}