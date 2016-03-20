import { getLayerCode } from './layers';

const exec = require('child_process').exec;
const path = require('path');

const SOURCE_FILE="/osmsrc/moscow.o5m";
const STAGES = {
    start: 'start',
    bound: 'bound',
    filter: 'filter'
};

let proccesses = {

};

function getBoundedFileName(id) {
    return `${id}_bounded.o5m`;
}

function cleanTempFiles() {

}

export function getResultFileName(id) {
    return `${id}_result.osm`;
}

function createBounded(id, coord) {

    console.log('createBounded');

    const coordString = `${coord.bottomLeft.lon},${coord.bottomLeft.lat},${coord.topRight.lon},${coord.topRight.lat}`;

    const cmd = (
        `osmconvert ${SOURCE_FILE} -b=${coordString} --complete-ways -o=/osmtmp/${getBoundedFileName(id)}`
    ); // osmconvert germany.o5m -b=10.5,49,11.5,50 --complete-ways -o=nuernberg.o5m

    console.log(cmd);

    const result = new Promise((resolve, reject) => {

        const child = exec(cmd, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                return reject(`
                    ${stdout}
                    ${stderr}
                    ${error}
                `);
            }

            resolve();
        });

        proccesses[id].stage = STAGES.bound;
        proccesses[id].bounded.proccess = child;

    });

    proccesses[id].bounded.result = result;

    return result;
}

function createFiltered(id, layers) {

    const codedLayers = layers.map((l) => getLayerCode(l)).join(' ');

    const cmd = (
        `osmfilter /osmtmp/${getBoundedFileName(id)} --keep="${codedLayers}" --drop-author > /osmresult/${getResultFileName(id)}`
    ); // osmfilter moscow.o5m --keep="natural=  boundary=administrative" --drop-author > out.osm

    console.log(cmd);

    const result = new Promise((resolve, reject) => {

        const child = exec(cmd, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                return reject(`
                    ${stdout}
                    ${stderr}
                    ${error}
                `);
            }

            resolve();
        });

        proccesses[id].stage = STAGES.filter;
        proccesses[id].filtered.proccess = child;

    });

    proccesses[id].filtered.result = result;

    return result;
}

export function createSelection({id, coord, layers}) {
    proccesses[id] = {
        stage: STAGES.start,
        bounded: {
            result: undefined,
            proccess: undefined
        },
        filtered: {
            result: undefined,
            proccess: undefined
        }
    };

    console.log('createSelection', id);

    const convertProcess = Promise.resolve()
        .then(() => createBounded(id, coord))
        .then(() => createFiltered(id, layers))
        .then(() => cleanTempFiles())
        .then(() => {
            console.log('Done');
            return {
                code: 'ok',
                id: id
            };
        })
        .catch((e) => {
            return {
                code: 'error',
                error: e,
                id: id
            };
        });

    return convertProcess;
}

export function killTaskProccess(id) {

    const process = proccesses[id];

    if (!process) {
        return;
    }

    try {
        if (process.stage === STAGES.bound) {
            process.bounded.proccess.kill();
        }
        if (process.stage === STAGES.filter) {
            process.filtered.proccess.kill();
        }
    } catch (e) {
        console.log(e);
    }

}
