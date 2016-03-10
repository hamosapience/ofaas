import React, {PropTypes} from 'react';
import {Component} from 'react';
import {updateTaskList} from '../actions/actions';
import { connect } from 'react-redux';
import Task from './Task';

const getTaskList = () => {
    return fetch('/api/tasks');
};

const mapStateToProps = (state) => {
    return {
        tasks: state.taskList.tasks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

class TaskList extends Component {

    componentDidMount() {

        const {dispatch} = this.props;

        setInterval(() => {

            getTaskList()
            .then(response => response.json())
            .then(tasks => {
                dispatch(updateTaskList(tasks));
            })
            .catch(ex => {

            });

        }, 1000);

    }

    render() {
        return (
            <div className="task-list">
                {this.props.tasks.map((t, i) =>
                    <Task {...t} key={i} />
                )}
            </div>
        );
    }

}

TaskList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.any)
};

export default connect(mapStateToProps)(TaskList);
