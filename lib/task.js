let workerIsBusy = false;
let currentTask;

let tasks = [
    // {"id":0,"status":"inProgress","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"filterParams":"nature=, bbox"},
    // {"id":1,"status":"inProgress","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    // {"id":2,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    // {"id":3,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    // {"id":4,"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/foo","filterParams":"nature=, bbox"},
    {"id":'5',"status":"completed","description":"Природная выборка Санкт-Петербурга","startDate":1457540338666,"completedDate":1457540338666,"resultLink":"/result/result.xml","filterParams":"nature=, bbox"}
];

let canceledTasks = [];

const getTasksToDo = () => tasks.filter(t => t.status === 'waiting');

const getTasksWithoutThis = (id) => tasks.filter(t => t.id !== id);

const getNewTaskId = () => {
    const currentIds = new Set(tasks.map(t => t.id));
    const newId = Math.floor(Math.random() * 100000000000000000).toString();

    if (currentIds.has(newId)) {
        return getNewTaskId();
    } else {
        return newId;
    }
};

const isTaskCanceled = (id) => !!canceledTasks.filter(t => t.id === id).length;

const createFilterDescription = ({coord, selectedLayers}) => {
    return `Слои: ${selectedLayers.toString()}`;
};

const onTaskComplete = ({code, id}) => {
    workerIsBusy = false;

    const inProgressTask = tasks.filter(t => t.id === id)[0];

    tasks = getTasksWithoutThis(id);

    const taskWasCanceled = isTaskCanceled(id);

    if (taskWasCanceled) {
        canceledTasks = canceledTasks.filter(t => t.id !== id);
        return;
    }

    tasks = [{
        id: id,
        status:"completed",
        description: inProgressTask.description,
        startDate: inProgressTask.startDate,
        completedDate: Date.now(),
        resultLink: "/result/result.xml",
        filterParams: inProgressTask.filterParams
    }, ...tasks];
};

const executeTask = (task) => {
    workerIsBusy = true;

    const {id, description} = task;

    tasks = getTasksWithoutThis(id);

    tasks = [{
        id: id,
        status: 'inProgress',
        description: task.description,
        startDate: task.startDate,
        filterParams: createFilterDescription(task)
    }, ...tasks];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 'ok',
                id: id
            });
        }, 5000);
    });

};

setInterval(() => {
    const tasksToDo = getTasksToDo();

    if (workerIsBusy || tasksToDo.length === 0) {
        return;
    }

    executeTask(tasksToDo[0]).then(onTaskComplete);
}, 1000);


export function addTask(taskData) {
    const task = Object.assign({}, taskData, {
        startDate: Date.now(),
        status: 'waiting',
        id: getNewTaskId()
    });

    tasks = [task, ...tasks];
}

export function cancelTask(taskId) {
    canceledTasks = [taskId, ...canceledTasks];
    tasks = getTasksWithoutThis(taskId);
}

export function deleteTask(taskId) {
    console.log('before', tasks);
    tasks = getTasksWithoutThis(taskId);
    console.log('after', tasks);
}

export function getTaskList() {
    // console.log('getTaskList');


    return tasks;
}
