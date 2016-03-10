import React, {PropTypes} from 'react';

const AddTaskDescription = () => {

    return (
        <div className="add-task-description">
            <div className="add-task-description__title">
                Описание задачи
            </div>

            <textarea className="add-task-description__input" />
        </div>
    );
};

export default AddTaskDescription;
