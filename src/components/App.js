import React, { PropTypes } from 'react';
// import FuelSavingsPage from '../containers/FuelSavingsPage';
import AddTask from './AddTask';
import TaskList from './TaskList';

const App = () => {
  return (
    <div className="content">
        <AddTask />
        <TaskList />
    </div>
  );
};

export default App;
