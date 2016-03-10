import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TASK_STATUSES from '../constants/TaskStatuses';
import TaskDate from './TaskDate';
import {cancelTask, deleteTask} from '../actions/actions';

const TASK_STATUSES_DESC = {
    [TASK_STATUSES.waiting]: 'Ожидание',
    [TASK_STATUSES.inProgress]: 'Задача выполняется',
    [TASK_STATUSES.completed]: 'Задача завершена',
    [TASK_STATUSES.error]: 'Ошибка'
};

const TASK_STATUSES_MOD = {
    [TASK_STATUSES.waiting]: 'waiting',
    [TASK_STATUSES.inProgress]: 'in-progress',
    [TASK_STATUSES.completed]: 'completed',
    [TASK_STATUSES.error]: 'error'
};

const getElapsedTime = (startDate) => {
    return (Date.now() - startDate) / 1000;
};

const displayFilterParams = (filterParams) => {
    alert(filterParams);
};

const displayError = (error) => {
    alert(error);
};

class Task extends Component {

    constructor(props) {
        super(props);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {

    }

    onCancelClick() {
        this.props.dispatch(cancelTask(this.props.id));
    }

    onDeleteClick() {
        this.props.dispatch(deleteTask(this.props.id));
    }

    render() {

        const {id, status, description, startDate, completedDate, resultLink, filterParams, error} = this.props;
        const taskClassName = `task task_status_${TASK_STATUSES_MOD[status]}`;

        return (
            <div className={taskClassName} data-id={id}>
                <div className="task__status">
                    {TASK_STATUSES_DESC[status]}
                </div>
                <div className="task__description">
                    {description}
                </div>

                <TaskDate label="Дата создания:" date={startDate} />

                {(status === TASK_STATUSES.completed) ?
                    <TaskDate label="Дата завершения:" date={completedDate} /> : ''
                }

                <a className="task__filter-params" href="#" onClick={() => displayFilterParams(filterParams)}>
                    Параметры фильтрации
                </a>

                {(status ===  TASK_STATUSES.completed) ?
                    <a className="task__result-link" target="_blank" href={resultLink}>
                        Результат
                    </a> : ''
                }
                {(status === TASK_STATUSES.error) ?
                    <div>
                        <a className="task__error-details" href="#" onClick={() => displayError(error)}>
                            Показать детали
                        </a>
                    </div>: ''
                }

                <div className="task__controls">
                    {(status ===  TASK_STATUSES.completed) ?
                        <a className="task__control" onClick={this.onDeleteClick} href="#"> Удалить </a> :
                        <a className="task__control" onClick={this.onCancelClick} href="#"> Отменить </a>
                    }
                </div>
            </div>
        );
    }

}

Task.propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    completedDate: PropTypes.number,
    resultLink: PropTypes.string,
    filterParams: PropTypes.string,
    error: PropTypes.string
};

export default connect()(Task);
