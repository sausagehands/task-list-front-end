import TaskList from './components/TaskList.jsx';
import './App.css';
import TASKS from './data';
import { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  useEffect(() => {
    axios
      .get('https://goals-and-tasks.onrender.com/tasks')
      .then((response) => {
        console.log('Step 1: Got response');
        return response.data;  // MUST return to pass to next .then()
      })
      .then((data) => {
        console.log('Step 2: Processing data');
        return data.results;
      })
      .then((results) => {
        console.log('Step 3: Final results', results);
        setTaskData(results);
      })
      .catch((error) => {
        console.error('Error at ANY step:', error.message);
      });
  }, []);

  const toggleCompleteFeature = (taskId) => {
    // find the task
    const task = taskData.find(task => task.id == taskId);

    // determing which endpoint to use
    const endpoint = task.isComplete
      ? `https://goals-and-tasks.onrender.com/tasks/${taskId}/mark_incomplete`
      : `https://goals-and-tasks.onrender.com/tasks/${taskId}/mark_complete`;

    // API call
    axios
      .patch(endpoint)
      .then((response) => {
        console.log('Task toggled in database:', response.data);

        // update local state
        setTaskData(taskData => taskData.map(task =>
          task.id === taskId
            ? { ...task, isComplete: !task.isComplete }
            : task
        ));
      })
      .catch((error) => {
        console.error('Error toggling task:', error.message);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`https://goals-and-tasks.onrender.com/tasks/${taskId}`)
      .then((response) => {
        console.log('Task deleted from database:', response.data);
        setTaskData(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error.message);
      });
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