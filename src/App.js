import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

let nextId = 0;

export default function App() {
  const [pendingTask, setPendingTask] = useState(''); // valeur courante du champ de saisie
  const [taskList, setTaskList] = useState([]); // liste des todo (tableau)

  return (
    <div>
      <h1>Todo:</h1>
      <input
        value={pendingTask}
        onChange={e => setPendingTask(e.target.value)}
      />
      <button onClick={() => {
        setPendingTask('');
        setTaskList([
          ...taskList,
          { id: nextId++, name: pendingTask }
        ]);
      }}>Add</button>
      <ul>
        {taskList.map(task => (
          <li key={task.id}>{task.name} <button onClick={() => {
            setTaskList(
              taskList.filter(taskListItem =>
                taskListItem.id !== task.id
              )
            );
          }}>
            Delete
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

