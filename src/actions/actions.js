export const UPDATE_TASK_LIST = 'UPDATE_TASK_LIST';

export function updateTaskList(tasks) {
    return {
        type: UPDATE_TASK_LIST,
        tasks
    };
}
