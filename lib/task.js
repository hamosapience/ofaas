let tasksToDo = [];
let workerIsBusy = false;

let tasks = [
    {"id":0,"status":"inProgress","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"filterParams":"nature=, bbox"},
    {"id":1,"status":"inProgress","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    {"id":2,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    {"id":3,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    {"id":4,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    {"id":5,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"}
];

const getNewTaskId = () => {
    const currentIds = new Set(tasks.map(t => t.id));
    const newId = Math.floor(Math.random() * 100000000000000000);

    if (currentIds.has(newId)) {
        return getNewTaskId();
    } else {
        return newId;
    }
};

const createFilterDescription = ({coord, selectedLayers}) => {
    return 'Описание параметров фильтрации';
};

const executeTask = (task) => {

    return new Promise((resolve, reject) => {
        
    });

};

setInterval(() => {

    if (workerIsBusy) {

    }

}, 1000);


export function addTask(taskData) {
    const task = Object.assign({}, taskData, {
        id: getNewTaskId()
    });

    tasksToDo.push(task);
}

export function cancelTask(taskId) {
    console.log('cancelTask');

}

export function removeTask(taskId) {
    console.log('removeTask');
}

export function getTaskList() {
    console.log('getTaskList');


    return tasks;
}
