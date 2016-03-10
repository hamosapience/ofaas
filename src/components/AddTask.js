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

const validateForm = ({
    coord,
    selectedLayers,
    description
}) => {

    // TODO: качественная валидация вводимого

    if (
        isNaN(coord.topLeft.lat) ||
        isNaN(coord.topLeft.lon) ||
        isNaN(coord.bottomRight.lat) ||
        isNaN(coord.bottomRight.lon) ||
        selectedLayers.length === 0,
        description === ''
    ) {
        return false;
    }

    return true;
};

const sendTask = (taskData) => {
    fetch('/api/add_task', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.assign({}, taskData))
    });
};

const onAddTaskClick = (e) => {
    e.preventDefault();
    // TODO: нормальная Redux/React-way обработка формы

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    const getLayerType = (l) => l.getAttribute('data-type');

    const formContent = {
        coord: {
            topLeft: {
                lat: parseFloat($(".add-task-bbox__top-left .add-task-bbox__input-lat").value),
                lon: parseFloat($(".add-task-bbox__top-left .add-task-bbox__input-lon").value)
            },
            bottomRight: {
                lat: parseFloat($(".add-task-bbox__bottom-right .add-task-bbox__input-lat").value),
                lon: parseFloat($(".add-task-bbox__bottom-right .add-task-bbox__input-lat").value)
            }
        },
        selectedLayers: Array.from($$(".add-task-layer__checkbox:checked")).map(getLayerType),
        description: $(".add-task-description__input").value
    };

    const validationResult = validateForm(formContent);

    if (!validationResult) {
        alert('Ошибка ввода данных');
        return;
    }

    sendTask(formContent);

    // TODO: очистить содержимое формы

};

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
                        <AddTaskLayer key={i} label={l.label} type={l.type} isSelected={false}/>
                    )}
                </div>
            </div>

            <AddTaskDescription />

            <a href="#" className="add-task-run" onClick={onAddTaskClick}>
                Добавить задачу
            </a>

        </div>
    );

};

export default AddTask;
