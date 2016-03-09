import React, {PropTypes} from 'react';
import {Component} from 'react';
import TASK_STATUSES from '../constants/TaskStatuses';
import TaskDate from './TaskDate';

const TASK_STATUSES_DESC = {
    [TASK_STATUSES.inProgress]: 'Активная задача',
    [TASK_STATUSES.completed]: 'Задача завершена',
    [TASK_STATUSES.error]: 'Ошибка'
};

const TASK_STATUSES_MOD = {
    [TASK_STATUSES.inProgress]: 'in-progress',
    [TASK_STATUSES.completed]: 'completed',
    [TASK_STATUSES.error]: 'error'
}

const getElapsedTime = (startDate) => {
    return (Date.now() - startDate) / 1000;
};

const displayFilterParams = (filterParams) => {
    alert(filterParams);
};

class Task extends Component {

    componentDidMount() {

    }

    render() {

        const {id, status, description, startDate, completedDate, resultLink, filterParams} = this.props;
        const taskClassName = `task task_status_${TASK_STATUSES_MOD[status]}`;

        return (
            <div className={taskClassName}>
                <div className="task__status">
                    {TASK_STATUSES_DESC[status]}
                </div>
                <div className="task__description">
                    {description}
                </div>

                <TaskDate label="Дата создания:" date={startDate} />

                {(status ===  TASK_STATUSES.completed) ?
                    <TaskDate label="Дата завершения:" date={completedDate} /> :
                    <div className="task__elapsed">
                        {getElapsedTime(startDate)}
                    </div>
                }

                <a className="task__filter-params" href="#" onClick={() => displayFilterParams(filterParams)}>
                    Параметры фильтрации
                </a>

                {(status ===  TASK_STATUSES.completed) ?
                    <a className="task__result-link" href={resultLink}>
                        Результат
                    </a> : ''
                }

                <div className="task__controls">
                    {(status ===  TASK_STATUSES.completed) ?
                        <a className="task__control" href="#"> Удалить </a> :
                        <a className="task__control" href="#"> Отменить </a>
                    }
                </div>
            </div>
        );
    }

}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    completedDate: PropTypes.number,
    resultLink: PropTypes.string,
    filterParams: PropTypes.string
};

export default Task;
