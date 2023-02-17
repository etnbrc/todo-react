import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

let nextId = 3;

const initialTodos = [
  { id: 0, title: 'Acheter du lait', done: true },
  { id: 1, title: 'Manger des tacos', done: false },
  { id: 2, title: 'Faire du thé', done: false },
];



export default function App() {
  const [pendingTask, setPendingTask] = useState(''); // valeur courante du champ de saisie
  const [taskList, setTaskList] = useState(initialTodos); // liste des todo (tableau)
  
  function handleToggleTaskList(taskListId, nextDone) {
    setTaskList(
      taskList.map(taskListItem => {
      if (taskListItem.id === taskListId) {
        // Create a *new* object with changes
        return { ...taskListItem, done: nextDone };
      } else {
        // No changes
        return taskListItem;
      }
    }));
  }

  function handleTaskEdit(taskListId, newTitle) {
    setTaskList(
      taskList.map(taskListItem => {
      if (taskListItem.id === taskListId) {
        // Create a *new* object with changes
        return { ...taskListItem, title: newTitle };
      } else {
        // No changes
        return taskListItem;
      }
    }));
  }

  return (
    <div>
      <h1>Todo:</h1>
      <input
        type="text"
        value={pendingTask}
        onChange={e => setPendingTask(e.target.value)}
      />
      {' '}
      <button onClick={() => {
        setPendingTask('');
        setTaskList([
          ...taskList,
          { id: nextId++, title: pendingTask, done: false }
        ]);
      }}>Add</button>
      <ul class="liste">
        {taskList.map(task => (
          <li key={task.id} >
            <input
              type="checkbox"
              checked={task.done}
              onChange={e => {
                handleToggleTaskList(
                  task.id,
                  e.target.checked
                );
              }}
            />
            {' '}
            <input
              type="text"
              value={task.title}
              onChange={(e) => {
                handleTaskEdit(
                  task.id,
                  e.target.value
                );
              }}
            />            
            {' '}
            <button onClick={() => {
              setTaskList(
                taskList.filter(taskListItem =>
                  taskListItem.id !== task.id
                )
              );
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}