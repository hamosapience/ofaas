export const LAYERS = [
    {
        label: 'Подписи',
        type: 'name',
        code: 'name='
    },
    {
        label: 'Дороги',
        type: 'highway',
        code: 'highway='
    },
    {
        label: 'Озера',
        type: 'lakes',
        code: 'natural=water'
    },
    {
        label: 'Острова',
        type: 'island',
        code: 'place=island place=islet'
    },
    {
        label: 'Леса',
        type: 'wood',
        code: 'natural=wood'
    },
    {
        label: 'Населённые пункты',
        type: 'city',
        code: 'place='
    },
    {
        label: 'Строения',
        type: 'building',
        code: 'building='
    },
    {
        label: 'Реки',
        type: 'river',
        code: 'natural=water water=river'
    },
    {
        label: 'Моря и океаны',
        type: 'coastline',
        code: 'natural=coastline natural=beach'
    },
    {
        label: 'Газопроводы и Нефтепроводы',
        type: 'pipeline',
        code: 'man_made=pipeline'
    },
    {
        label: 'Линии электропередач',
        type: 'powerline',
        code: 'power=line'
    },
    {
        label: 'Просеки',
        type: 'cutline',
        code: 'man_made=cutline'
    },
    {
        label: 'Мосты',
        type: 'bridge',
        code: 'man_made=bridge building=bridge bridge='
    },
    {
        label: 'Скалы',
        type: 'cliff',
        code: 'natural=cliff natural=rock'
    },
    {
        label: 'Болота',
        type: 'wetland',
        code: 'natural=wetland'
    }
];

export function getLayerCode(type) {
    return LAYERS.filter(l => l.type === type)[0].code;
}
