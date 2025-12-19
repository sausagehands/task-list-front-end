import TaskList from './components/TaskList.jsx';
import './App.css';
import TASKS from './data';
import { useState } from 'react';


const App = () => {
  const[taskData, setTaskData] = useState(TASKS);

  const toggleCompleteFeature = (taskId) => {
    setTaskData(taskData => taskData.map(task => 
      task.id === taskId
       ? {...task, isComplete : !task.isComplete}
       : task
    ));
  };

  const deleteTask = (taskId) => {
    setTaskData(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList 
          tasks={taskData}
          onToggle={toggleCompleteFeature}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;
