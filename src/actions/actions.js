export const UPDATE_TASK_LIST = 'UPDATE_TASK_LIST';
export const CANCEL_TASK = 'CANCEL_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export function updateTaskList(tasks) {
    return {
        type: UPDATE_TASK_LIST,
        tasks
    };
}

export function cancelTask(id) {
    return {
        type: CANCEL_TASK,
        id
    };
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        id
    };
}
