import React, {PropTypes} from 'react';

const AddTaskLayer = ({label, type, isSelected}) => {

    return (
        <div className="add-task-layer">
            <input className="add-task-layer__checkbox" type="checkbox" checked={isSelected ? 'checked' : ''}></input>
            <div className="add-task-layer__label">
                {label}
            </div>
        </div>
    );
};

AddTaskLayer.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
};

export default AddTaskLayer;
