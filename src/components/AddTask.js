import React, {PropTypes} from 'react';
import AddTaskBboxInput from './AddTaskBboxInput';
import AddTaskLayer from './AddTaskLayer';
import AddTaskDescription  from './AddTaskDescription';

const LAYERS = [
    {
        label: 'Подписи',
        type: 'name'
    },
    {
        label: 'Дороги',
        type: 'highway'
    },
    {
        label: 'Озера',
        type: 'lakes'
    },
    {
        label: 'Острова',
        type: 'island'
    },
    {
        label: 'Леса',
        type: 'wood'
    },
    {
        label: 'Населённые пункты',
        type: 'city'
    },
    {
        label: 'Строения',
        type: 'building'
    },
    {
        label: 'Реки',
        type: 'river'
    },
    {
        label: 'Моря и океаны',
        type: 'coastline'
    },
    {
        label: 'Газопроводы и Нефтепроводы',
        type: 'pipeline'
    },
    {
        label: 'Линии электропередач',
        type: 'powerline'
    },
    {
        label: 'Просеки',
        type: 'cutline'
    },
    {
        label: 'Мосты',
        type: 'bridge'
    },
    {
        label: 'Скалы',
        type: 'cliff'
    },
    {
        label: 'Болота',
        type: 'wetland'
    }
];

const validateForm = ({
    coord,
    selectedLayers,
    description
}) => {

    // TODO: качественная валидация вводимого

    if (
        isNaN(coord.bottomLeft.lat) ||
        isNaN(coord.bottomLeft.lon) ||
        isNaN(coord.topRight.lat) ||
        isNaN(coord.topRight.lon) ||
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
            bottomLeft: {
                lat: parseFloat($(".add-task-bbox__bottom-left .add-task-bbox__input-lat").value),
                lon: parseFloat($(".add-task-bbox__bottom-left .add-task-bbox__input-lon").value)
            },
            topRight: {
                lat: parseFloat($(".add-task-bbox__top-right .add-task-bbox__input-lat").value),
                lon: parseFloat($(".add-task-bbox__top-right .add-task-bbox__input-lon").value)
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
                    Ввод прямоугольника выборки
                </div>
                <AddTaskBboxInput coord="bottom-left" label="Нижний левый угол (ЮЗ)"/>
                <AddTaskBboxInput coord="top-right" label="Верхний правый угол (СВ)"/>
            </div>

            <div className="add-task-layers">
                <div className="add-task-layers__title">
                    Выбор слоёв
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
