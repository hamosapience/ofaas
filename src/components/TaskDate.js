import React, {PropTypes} from 'react';

const TaskDate = ({label, date}) => {

    return (
        <div className="task__date">
            <div className="task__date-label">
                {label}
            </div>
            <div className="task__date-date">
                {(new Date(date)).toGMTString()}
            </div>
        </div>
    );
};

TaskDate.propTypes = {
    label: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired
};

export default TaskDate;
