import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const taskbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${taskbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));

};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    completedAt: apiTask.completed_at ? apiTask.completed_at : null,
    goalId: apiTask.goal_id ? apiTask.goal_id : null,
    goal: apiTask.goal ? apiTask.goal : "Unknown",
    isComplete: apiTask.completed_at ? true : false,
  };
  delete newTask.completed_at;
  delete newTask.goal_id;

  return newTask;
};

const toggleTaskAPI = (taskId, curComplete) => {
  const endpoint = curComplete
    ? `/tasks/${taskId}/mark_incomplete`
    : `/tasks/${taskId}/mark_complete`
  
  return axios.patch(`${taskbaseURL}${endpoint}`)
    .catch(error => console.log(error));
};

const addTaskAPI = (data) => {
  return axios.post(`${taskbaseURL}/tasks`, data)
    .catch(error => console.log(error));
};

const removeTaskAPI = taskId => {
  return axios.delete(`${taskbaseURL}/tasks/${taskId}`)
    .catch(error => console.log(error));
};


function App () {
  const[taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
     .then(tasks => {
      const newTasks = tasks.map(convertFromAPI);
      setTaskData(newTasks);
     });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleToggleComplete = (taskId) => {
    const task = taskData.find(task => task.id === taskId);
    const curComplete = task.isComplete;

    return toggleTaskAPI(taskId, curComplete)
      .then(() => {
        setTaskData(prevComplete => prevComplete.map(task =>
          task.id === taskId
            ? {...task, isComplete: !curComplete}
            : task
        ));
      });
  };


  const deleteTask = taskId => {
    return removeTaskAPI(taskId)
      .then(() => {
        return setTaskData(taskData => {
          return taskData.filter(task => task.id !== taskId);
        });
      });
  };


  const onHandleSubmit = (data) => {
    return addTaskAPI(data)
      .then((result) => {
        const apiTask = result.data.task;
        return setTaskData((prevTasks) => [convertFromAPI(apiTask), ...prevTasks]);
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
          onToggle={handleToggleComplete}
          onDelete={deleteTask}
        />
        <NewTaskForm onHandleSubmit={onHandleSubmit}/>
      </main>
    </div>
  );
};

export default App;
