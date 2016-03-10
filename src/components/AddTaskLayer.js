import React, {PropTypes} from 'react';

const AddTaskLayer = ({label, type, isSelected}) => {

    const onLayerClick = (e) => {
    };

    const checkboxId = `add-task-layer_${type}`;

    return (
        <div className="add-task-layer">
            <input
                className="add-task-layer__checkbox"
                type="checkbox"
                onChange={onLayerClick}
                id={checkboxId}
                name={checkboxId}
                data-type={type}
                />
            <label className="add-task-layer__label" htmlFor={checkboxId}>
                {label}
            </label>
        </div>
    );
};

AddTaskLayer.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
};

export default AddTaskLayer;
