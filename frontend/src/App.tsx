import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Todo {
  _id: string;
  text: string;
  complete: boolean;
}

const api_base = 'http://localhost:5555';

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    GetTodos();
  }, []);

 //GET All the Todo Task from database
  const GetTodos = async () => {
    try {
      const response = await axios.get(api_base + '/todos');
      const data: Todo[] = response.data;
      setTodos(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

//Updating the status of Todo Task
  const completeTodo = async (id: string) => {
    try {
      const response = await axios.put(api_base + `/todo/complete/${id}`);
      const data: Todo = response.data;
  
      setTodos(todos => todos.map(todo => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
  
        return todo;
      }));
    } catch (error) {
      console.error("Error: ", error);
    }
  }


//Adding new Todo Task into Database
  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${api_base}/todo/new`,
        { text: newTodo }, // This is the request payload
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const data: Todo = response.data;
  
      setTodos([...todos, data]);
      setPopupActive(false);
      setNewTodo("");
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  //Deleting Existed Todo Task from database
const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(api_base + `/todo/delete/${id}`);
    const data: Todo = response.data;

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  } catch (error) {
    console.error("Error: ", error);
  }
}

  return (
    <div className="App">
      <h1>Welcome, Tyler</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? todos.map(todo => (
          <div className={
            "todo" + (todo.complete ? " is-complete" : "")
          } key={todo._id} onClick={() => completeTodo(todo._id)}>
            <div className="checkbox"></div>

            <div className="text">{todo.text}</div>

            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
          </div>
        )) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
