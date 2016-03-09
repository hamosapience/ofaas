import React, {PropTypes} from 'react';
import AddTaskBboxInput from './AddTaskBboxInput';
import AddTaskLayer from './AddTaskLayer';
import AddTaskDescription  from './AddTaskDescription';

const LAYERS = [
    {
        label: 'Надписи',
        type: 'name'
    },
    {
        label: 'Дороги',
        type: 'roads'
    },
    {
        label: 'Озера',
        type: 'lakes'
    }
];

const AddTask = () => {

    return (
        <div className="add-task">

            <div className="add-task__title">
                Создание новой выборки
            </div>

            <div className="add-task-bbox">
                <div className="add-task-bbox__title">
                    Ввод координат выборки
                </div>
                <AddTaskBboxInput coord="top-left" label="Верхний левый угол"/>
                <AddTaskBboxInput coord="bottom-right" label="Нижний правый угол"/>
            </div>

            <div className="add-task-layers">
                <div className="add-task-layers__title">
                    Задание списка слоёв
                </div>
                <div className="add-task-layers__list">
                    {LAYERS.map((l, i) =>
                        <AddTaskLayer key={i} label={l.label} type={l.type} isSelected={true} />
                    )}
                </div>
            </div>

            <AddTaskDescription />

            <a href="#" className="add-task-run">
                Добавить задачу
            </a>

        </div>
    );

};

export default AddTask;
