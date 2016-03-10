import { combineReducers } from 'redux';
import {UPDATE_TASK_LIST, CANCEL_TASK, DELETE_TASK} from '../actions/actions';
import {TOGGLE_LAYER} from '../constants/ActionTypes';

const initialTaskListState = {
    tasks: []
};

const initialAddTaskState = {
    coord: {
        topLeft: {
            lat: null,
            lon: null
        },
        bottomRight: {
            lat: null,
            lon: null
        }
    },
    selectedLayers: new Set(),
    description: null
};

function taskList(state = initialTaskListState, action) {
    switch (action.type) {

        case UPDATE_TASK_LIST: {
            return Object.assign({}, state, {
                tasks: action.tasks
            });
        }

        case CANCEL_TASK: {
            fetch(`/api/cancel_task?id=${action.id}`);
            return state;
        }

        case DELETE_TASK: {
            fetch(`/api/delete_task?id=${action.id}`);
            return state;
        }

        default:
            return state;

    }
}

const rootReducer = combineReducers({
    taskList
});

export default rootReducer;
