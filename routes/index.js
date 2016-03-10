const express = require('express');
const router = express.Router();
import {addTask, cancelTask, removeTask, getTaskList} from '../lib/task';

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
    res.send(200);
});

router.get('/api/remove_task', (req, res, next) => {
    removeTask(req.query.id);
});

router.get('/api/cancel_task', (req, res, next) => {
    cancelTask(req.query.id);
});

module.exports = router;
