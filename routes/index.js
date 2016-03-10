const express = require('express');
const router = express.Router();
import {addTask, cancelTask, deleteTask, getTaskList} from '../lib/task';

const indexPage = require('fs').readFileSync('./src/index.html').toString();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.send(indexPage);
});

router.get('/api/tasks', (req, res, next) => {
    res.json(getTaskList());
});

router.post('/api/add_task', (req, res, next) => {
    addTask(req.body);
    res.sendStatus(200);
});

router.get('/api/delete_task', (req, res, next) => {
    deleteTask(req.query.id);
    res.sendStatus(200);
});

router.get('/api/cancel_task', (req, res, next) => {
    cancelTask(req.query.id);
    res.sendStatus(200);
});

module.exports = router;
