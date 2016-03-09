import React, {PropTypes} from 'react';
import Task from './Task';
import TASK_STATUSES from '../constants/TaskStatuses';

const tasks = [{
    id: 0,
    status: TASK_STATUSES.inProgress,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: undefined,
    resultLink: undefined,
    filterParams: 'nature=, bbox'
}, {
    id: 1,
    status: TASK_STATUSES.inProgress,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: undefined,
    resultLink: '/foo',
    filterParams: 'nature=, bbox'
}, {
    id: 2,
    status: TASK_STATUSES.completed,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: Date.now(),
    resultLink: '/foo',
    filterParams: 'nature=, bbox'
}, {
    id: 3,
    status: TASK_STATUSES.completed,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: Date.now(),
    resultLink: '/foo',
    filterParams: 'nature=, bbox'
}, {
    id: 4,
    status: TASK_STATUSES.completed,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: Date.now(),
    resultLink: '/foo',
    filterParams: 'nature=, bbox'
}, {
    id: 5,
    status: TASK_STATUSES.completed,
    description: 'Природная выборка Санкт-Петербурга',
    startDate: Date.now(),
    completedDate: Date.now(),
    resultLink: '/foo',
    filterParams: 'nature=, bbox'
}];

const TaskList = () => {
    return (
        <div className="task-list">
            {tasks.map((t, i) =>
                <Task {...t} key={i} />
            )}
        </div>
    );
};

export default TaskList;
