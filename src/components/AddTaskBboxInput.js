import React, {PropTypes} from 'react';

const AddTaskBboxInput = ({coord, label}) => {
    const inputClassName = `add-task-bbox__input add-task-bbox__${coord}`;
    // TODO: пояснение формата ввода координат
    return (
        <div className={inputClassName}>
            <div className="add-task-bbox__input-label">
                {label}
            </div>
            <input className="add-task-bbox__input-lat" placeholder="Широта" type="number"/>
            <input className="add-task-bbox__input-lon" placeholder="Долгота" type="number"/>
        </div>
    );
};

AddTaskBboxInput.propTypes = {
    coord: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default AddTaskBboxInput;
