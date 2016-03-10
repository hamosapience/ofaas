import { createSelection, killTaskProccess, getResultFileName } from './osm';

const fs = require('fs');

const PERSISTANCE_FILE = './tmp/persistance.json';

let workerIsBusy = false;
let currentTask;

let persistedTasks = [];

try {
    persistedTasks = JSON.parse(fs.readFileSync(PERSISTANCE_FILE));
} catch (e) {
    console.log(`Get persisted error: ${e}`);
}

let tasks = [...persistedTasks];

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

const generateCompletedTaskItem = ({id, description, startDate, filterParams}) => {
    return {
        id,
        status: 'completed',
        description,
        startDate,
        completedDate: Date.now(),
        resultLink: `/result/${getResultFileName(id)}`,
        filterParams
    };
};

const generateInProgessTaskItem = ({id, description, startDate, filterParams}) => {
    return {
        id,
        status: 'inProgress',
        description,
        startDate,
        filterParams
    };
};

const generateErrorTaskItem = ({id, description, startDate, filterParams, error}) => {
    return {
        id,
        status: 'error',
        description,
        startDate,
        filterParams,
        error
    };
};

const persistTasks = () => {

    const completedTask = tasks.filter(t => t.status === 'completed');

    try {
        fs.writeFile(PERSISTANCE_FILE, JSON.stringify(completedTask));
    } catch (e) {
        console.log('Error persistTasks ' + e);
    }

};

const onTaskComplete = ({code, id, error}) => {
    workerIsBusy = false;

    const inProgressTask = tasks.filter(t => t.id === id)[0];

    tasks = getTasksWithoutThis(id);

    const taskWasCanceled = isTaskCanceled(id);

    if (taskWasCanceled) {
        canceledTasks = canceledTasks.filter(t => t.id !== id);
        return;
    }

    const {description, startDate, filterParams} = inProgressTask;

    if (code === 'ok') {
        tasks = [generateCompletedTaskItem({
            id,
            description,
            startDate,
            filterParams
        }), ...tasks];

        persistTasks();
    } else {
        tasks = [generateErrorTaskItem({
            id,
            description,
            startDate,
            filterParams,
            error
        }), ...tasks];
    }

};

const executeTask = (task) => {
    workerIsBusy = true;

    const {id, description, startDate, selectedLayers, coord} = task;

    tasks = getTasksWithoutThis(id);

    tasks = [generateInProgessTaskItem({
        id,
        description,
        startDate,
        filterParams: createFilterDescription(task)
    }), ...tasks];

    return createSelection({
        id,
        coord,
        layers: selectedLayers
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
    killTaskProccess(taskId);
    canceledTasks = [taskId, ...canceledTasks];
    tasks = getTasksWithoutThis(taskId);
}

export function deleteTask(taskId) {
    tasks = getTasksWithoutThis(taskId);
}

export function getTaskList() {
    // console.log('getTaskList');


    return tasks;
}
